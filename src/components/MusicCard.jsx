import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { artistName, albumName, trackName, previewUrl } = this.props;
    console.log(albumName);
    return (
      <div>
        <h2>{artistName}</h2>
        <h3>{albumName}</h3>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  artistName: PropTypes.string,
  albumName: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;
