import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Modal from '../shared/Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { getPhoto } from '../shared/services/api';

export class App extends Component {
  state = {
    items: [],
    search: '',
    page: 1,
    modalOpen: false,
    modalContent: {},
    error: null,
    loading: false,
    notification: false,
    total: 0,
    totalForCheck: 12,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;
    if (page !== prevState.page || search !== prevState.search) {
      this.fetchPhoto();
    }
  }

  async fetchPhoto() {
    this.setState({
      loading: true,
      notification: false,
      error: null,
    });
    const { search, page } = this.state;
    try {
      const data = await getPhoto(search, page);
      if (data.total === 0) {
        this.setState({ notification: true });
      }
      this.setState(({ items }) => {
        return {
          items: [...items, ...data.hits],
          total: data.total,
        };
      });
    } catch (error) {
      this.setState({
        error: error,
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  changeSearch = string => {
    const { search } = this.state;
    if (string !== search) {
      this.setState({
        search: string,
        items: [],
        page: 1,
        totalForCheck: 12,
      });
    }
  };

  loadMore = () => {
    this.setState(({ page, totalForCheck }) => {
      return {
        page: page + 1,
        totalForCheck: totalForCheck + 12,
      };
    });
  };

  showModal = (url, tags) => {
    this.setState({
      modalOpen: true,
      modalContent: {
        src: url,
        alt: tags,
      },
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
    });
  };

  render() {
    const { loadMore, changeSearch, showModal, closeModal } = this;
    const {
      items,
      modalContent,
      modalOpen,
      loading,
      notification,
      error,
      totalForCheck,
      total,
    } = this.state;
    return (
      <div className="App">
        {modalOpen && (
          <Modal closeModal={closeModal}>
            <img className="modalImg" src={modalContent.src} alt={modalContent.alt} />
          </Modal>
        )}
        <Searchbar onSubmit={changeSearch} />
        <ImageGallery onClick={showModal} items={items} />
        {loading && <Loader />}
        {notification && (
          <p className="notification">Sorry no results, try again...</p>
        )}
        {error && <p className="error">Something wrong: {error.code}</p>}
        {!loading && items.length >= 12 && totalForCheck < total && (
          <Button onClick={loadMore} />
        )}
      </div>
    );
  }
}
