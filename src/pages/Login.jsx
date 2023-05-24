import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../style/login.css';

export default class Login extends Component {
  state = {
    isLoading: false,
    loginName: '',
    isSaveButtonDisabled: true,
    isRedirect: false,
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState(
      {
        loginName: value,
      },
      () => this.handleButtonDisabled(),
    );
  };

  handleButtonDisabled = () => {
    const { loginName } = this.state;
    const maxLength = 3;
    if (loginName.length >= maxLength) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  };

  handleSaveLogin = async () => {
    const { loginName } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name: loginName });
    this.setState({
      isRedirect: true,
    });
  };

  render() {
    const { isSaveButtonDisabled, isLoading, isRedirect } = this.state;
    return (
      <div data-testid="page-login">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="inFormBackground">
            <div className="circle" />
            <div className="circle" />
            <div className="inLoginForm">
              <form>
                <div className="title">
                  <h3>Login</h3>
                </div>
                <label className="inputGroup" htmlFor="name">
                  Nome
                  <input
                    data-testid="login-name-input"
                    placeholder="nome"
                    type="text"
                    name="loginName"
                    id="name"
                    onChange={ this.onInputChange }
                  />
                </label>
                <button
                  className="submitForm"
                  data-testid="login-submit-button"
                  type="button"
                  name="submit-button"
                  disabled={ isSaveButtonDisabled }
                  onClick={ this.handleSaveLogin }
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>
        )}
        {isRedirect && <Redirect to="/search" />}
      </div>
    );
  }
}
