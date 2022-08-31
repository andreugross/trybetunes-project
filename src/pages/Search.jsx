import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    // isLoading: false,
    searchArtist: '',
    isSearchButtonDisabled: true,
    // isRedirect: false,
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState(
      {
        searchArtist: value,
      },
      () => this.handleButtonDisabled(),
    );
  };

  handleButtonDisabled = () => {
    const { searchArtist } = this.state;
    const maxLength = 2;
    if (searchArtist.length >= maxLength) {
      this.setState({
        isSearchButtonDisabled: false,
      });
    } else {
      this.setState({
        isSearchButtonDisabled: true,
      });
    }
  };

  render() {
    const { isSearchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-field">
            Nome
            <input
              data-testid="search-artist-input"
              type="text"
              name="search"
              id="search-field"
              onChange={ this.onInputChange }
            />
          </label>
          <div>
            <button
              data-testid="search-artist-button"
              type="button"
              name="submit-button"
              disabled={ isSearchButtonDisabled }
              // onClick={ this.handleSaveLogin }
            >
              Pesquisar
            </button>
          </div>
        </form>
      </div>
    );
  }
}
