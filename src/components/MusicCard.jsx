import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    check: false,
    isLoading: false,
  };

  handleAddFavorite = async (song) => {
    this.setState({ isLoading: true });
    await addSong(song);
    this.setState({
      isLoading: false,
      check: true,
    });
  };

  render() {
    const { trackName, previewUrl, trackId, song } = this.props;
    const { isLoading, check } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor="add-favorite">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id="add-favorite"
            checked={ check }
            onChange={ () => this.handleAddFavorite(song) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
  song: PropTypes.string,
}.isRequired;
