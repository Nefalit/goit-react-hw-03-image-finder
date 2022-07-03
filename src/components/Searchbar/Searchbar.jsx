import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      search: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let result = this.state.search;
    const { onSubmit } = this.props;
    onSubmit(result);
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { totalImg, totalShown } = this.props;
    return (
      <header className={s.searchBar}>
        <form onSubmit={handleSubmit} className={s.searchForm}>
          <button type="submit" className={s.searchBtn}>
            <span className={s.searchBtnLabel}>Search</span>
          </button>

          <input
            onChange={handleChange}
            className={s.searchInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </form>
        <p className={s.total}>Total image find : {totalImg} </p>
        <p className={s.total}>Total image shown: {totalShown} </p>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
