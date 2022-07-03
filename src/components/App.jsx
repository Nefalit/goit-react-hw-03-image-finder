import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Total from './Total/Total';
import Modal from '../shared/components/Modal/Modal';
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
    totalForCheck: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, search, items: newItems } = this.state;
    const { items: oldItems } = prevState;

    if (page !== prevState.page || search !== prevState.search) {
      this.fetchPhoto();
    }
    if (newItems.length !== oldItems.length) {
      this.setState({ totalForCheck: newItems.length });
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
          total: data.totalHits,
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
        total: 0,
      });
    }
  };

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
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
            <img
              className="modalImg"
              src={modalContent.src}
              alt={modalContent.alt}
            />
          </Modal>
        )}
        <Searchbar onSubmit={changeSearch} />
        {items.length >= 12 && (
          <Total totalImg={total} totalShown={totalForCheck} />
        )}
        {!notification && !error && (
          <ImageGallery onClick={showModal} items={items} />
        )}
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
