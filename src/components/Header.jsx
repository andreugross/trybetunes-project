import React, { Component } from 'react';
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
          {isLoading ? <Loading /> : <p>{userName}</p>}
        </h3>
      </header>
    );
  }
}
