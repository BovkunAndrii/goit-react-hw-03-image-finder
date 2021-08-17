import { Component } from "react";
import PropTypes from "prop-types";
import S from "./Searchbar.module.css";

class SearchForm extends Component {
  state = { qwery: "" };

  handleChange = (e) => {
    this.setState({ qwery: e.currentTarget.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.qwery);
    this.setState({ qwery: "" });
  };

  render() {
    return (
      <header className={S.Searchbar}>
        <form className={S.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={S.SearchFormButton}>
            <span className={S.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={S.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchForm.propTypes = {
  qwery: PropTypes.string,
};

export default SearchForm;
