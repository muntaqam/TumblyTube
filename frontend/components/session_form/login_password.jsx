import React from "react";
import { Link } from "react-router-dom";

class LoginPassword extends React.Component {
  render() {
    let error;
    if (this.props.errors.length > 0) {
      error = (
        <div className="session__errors">
          <span className="material-icons">error</span>
          <span>Incorrect password</span>
        </div>
      );
    }

    return (
      <div className="login login--container">
        <header className="session__header session__header__login">
          <Link to="/" className="session__header__logo__container">
            <img
              className="session__header__logo__img"
              src={window.tumbleLogoURL}
            />
          </Link>
          <h2 className="session__header__title">
            Hi {this.props.values.username}
          </h2>
          <div
            className="session__header__username"
            onClick={this.props.prevStep}
          >
            <span className="session__header__subtitle">
              {this.props.values.username}
            </span>
            <span className="material-icons">expand_more</span>
          </div>
        </header>
        <form className="login__form">
          <div className="login__form__input">
            <input
              type="password"
              className={
                "login__form__input__item" +
                (error ? " signup__form__input__item--error" : "")
              }
              onChange={this.props.handleChange}
              placeholder=" "
              value={this.props.values.password}
            />
            <label className="login__form__input__label">Password</label>
            {error}
          </div>
          <div className="login__form__question">
            Don't want to sign in or create an account?{" "}
          </div>
          <a className="login__form__demo" onClick={this.props.handleDemo}>
            Sign in as demo user
          </a>
          <div className="login__form__btn">
            <div className="login__form__btn__link--light">
              {this.props.formLink}
            </div>
            <button
              className="login__form__btn__item"
              onClick={this.props.handleSubmit}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPassword;
