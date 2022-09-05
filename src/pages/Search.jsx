import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from './Card';
import Loading from './Loading';

export default class Search extends Component {
  state = {
    isLoading: false,
    searchArtist: '',
    isSearchButtonDisabled: true,
    artistList: [],
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

  handleShowArtist = async () => {
    const { searchArtist } = this.state;
    this.setState({ isLoading: true });
    const artist = await searchAlbumsAPI(searchArtist);
    this.setState({
      artistList: artist,
      isLoading: false,
    });
  };

  render() {
    const { isSearchButtonDisabled, isLoading, artistList, searchArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
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
                onClick={ this.handleShowArtist }
              >
                Pesquisar
              </button>
            </div>
          </form>
        )}
        {artistList.length <= 0 ? (
          <h1>Nenhum álbum foi encontrado</h1>
        ) : (
          <div>
            <h2>{`Resultado de álbuns de: ${searchArtist}`}</h2>
            {artistList.map(
              ({
                collectionId,
                artistName,
                collectionName,
                artworkUrl100,
                releaseDate,
              }) => (
                <Link
                  to={ `/album/${collectionId}` }
                  key={ collectionId }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  <Card
                    key={ collectionId }
                    artistName={ artistName }
                    collectionName={ collectionName }
                    artworkUrl100={ artworkUrl100 }
                    releaseDate={ releaseDate }
                  />
                </Link>
              ),
            )}
          </div>
        )}
      </div>
    );
  }
}
