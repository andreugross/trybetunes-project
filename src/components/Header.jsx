import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    isLoading: true,
    userName: 'User',
  };

  componentDidMount() {
    this.handleShowUser();
  }

  handleShowUser = async () => {
    const { name } = await getUser();
    this.setState({ isLoading: false, userName: name });
  };

  render() {
    const { isLoading, userName } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Trybetunes</h1>
        <h3 data-testid="header-user-name">
          {isLoading ? (
            <Loading />
          ) : (
            <p>
              olá,
              {' '}
              {userName}
            </p>
          )}
        </h3>
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}
