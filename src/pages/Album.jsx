import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    albumList: [],
    musicList: [],
    isLoading: false,
  };

  componentDidMount() {
    this.returnApi();
  }

  returnApi = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const music = await getMusics(id);
    this.setState({
      albumList: music,
      musicList: music.filter((element, index) => index !== 0),
    });
  };

  render() {
    const { albumList, musicList, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div>
              {albumList.map((element, index) => (index === 0 ? (
                <div key={ index }>
                  <h2 data-testid="artist-name">{element.artistName}</h2>
                  <p data-testid="album-name">{element.collectionName}</p>
                </div>
              ) : null))}
            </div>
            <ul>
              {musicList.map((element, index) => (
                <MusicCard
                  key={ index }
                  trackName={ element.trackName }
                  previewUrl={ element.previewUrl }
                />
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
