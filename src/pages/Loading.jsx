import React, { Component } from 'react';
import '../style/loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div>
        <h1>Carregando...</h1>
        <div className="middle">
          <div className="bar bar1" />
          <div className="bar bar2" />
          <div className="bar bar3" />
          <div className="bar bar4" />
          <div className="bar bar5" />
          <div className="bar bar6" />
          <div className="bar bar7" />
          <div className="bar bar8" />
        </div>
      </div>
    );
  }
}
