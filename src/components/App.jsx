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
    loading: false,
    error: null,
    search: '',
    page: 1,
    modalOpen: false,
    modalContent: {},
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
    });
    const { search, page } = this.state;
    try {
      const data = await getPhoto(search, page);
      this.setState(({ items }) => {
        return {
          items: [...items, ...data.hits],
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

  changeSearch = search => {
    this.setState({
      search,
      items: [],
    });
  };

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  showModal = modalContent => {
    this.setState({
      modalOpen: true,
      modalContent,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
    });
  };

  render() {
    const { loadMore, changeSearch, showModal, closeModal } = this;
    const { items, modalContent, modalOpen, loading } = this.state;
    return (
      <div className="App">
        {modalOpen && (
          <Modal closeModal={closeModal}>
            <img className="modalImg" src={modalContent} alt={modalContent} />
          </Modal>
        )}
        <Searchbar onSubmit={changeSearch} />
        <ImageGallery onClick={showModal} items={items} />
        {loading && <Loader />}
        <Button onClick={loadMore} />
      </div>
    );
  }
}
