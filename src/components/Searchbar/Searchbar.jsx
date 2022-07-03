import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    input: '',
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const result = this.state.input;
    const { onSubmit } = this.props;
    onSubmit(result);
  };

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <header className={s.searchBar}>
        <form onSubmit={handleSubmit} className={s.searchForm}>
          <button type="submit" className={s.searchBtn}>
            <span className={s.searchBtnLabel}>Search</span>
          </button>

          <input
            onChange={handleChange}
            className={s.searchInput}
            name="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
