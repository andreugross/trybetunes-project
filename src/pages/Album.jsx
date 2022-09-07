import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
// ======================> Referencia de ajuda pessoa estudante Gabriel Coelho
export default class Album extends Component {
  state = {
    // isLoading: false,
    musicList: [],
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
      artistName: music[0].artistName,
      albumName: music[0].collectionName,
      musicList: music.filter((_element, index) => index !== 0),
    });
  };

  render() {
    const { musicList, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="album-name">{albumName}</h2>
          <h3 data-testid="artist-name">{artistName}</h3>
          {musicList.map((element) => (
            <MusicCard
              key={ element.trackId }
              trackName={ element.trackName }
              previewUrl={ element.previewUrl }
            />
          ))}
        </div>
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
