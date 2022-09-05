import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const {
      // artistId,
      artistName,
      collectionName,
      artworkUrl100,
      releaseDate,
    } = this.props;
    return (
      <div>
        <img src={ artworkUrl100 } alt={ artistName } name="cardImage" />
        <h2 name="artistName">{artistName}</h2>
        <h3 name="collectionName">{collectionName}</h3>
        <p name="releaseDate">{releaseDate}</p>
      </div>
    );
  }
}

Card.propTypes = {
  // artistId: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
};
