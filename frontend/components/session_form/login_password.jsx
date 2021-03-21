import React from "react";

class LoginPassword extends React.Component {
  render() {
    return (
      <div className="login">
        <header className="login__header">
          <img className="login__header__logo" src={window.tumbleLogoURL} />
          <h2 className="login__header__title">
            Hi {this.props.values.username}
          </h2>
          <span
            className="login__header__subtitle"
            onClick={this.props.prevStep}
          >
            {this.props.values.username}
          </span>
        </header>
        <form className="login__form">
          <div className="login__form__input">
            <input
              type="password"
              className="login__form__input__item"
              onChange={this.props.handleChange}
              value={this.props.values.password}
            />
            <label className="login__form__input__label">Password</label>
          </div>
          <div className="login__form__question question--no-margin">
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
