import React from "react";

class LoginUsername extends React.Component {
  render() {
    return (
      <div className="login login--container">
        {/* {this.renderErrors()} */}
        <header className="session__header session__header__login">
          <img className="session__header__logo" src={window.tumbleLogoURL} />
          <h2 className="session__header__title">Sign in</h2>
          <span className="session__header__subtitle">
            to continue to TumblyTube
          </span>
        </header>
        <form className="login__form">
          <div className="login__form__input">
            <input
              className="login__form__input__item"
              onChange={this.props.handleChange}
              value={this.props.values.username}
            />
            <label className="login__form__input__label">
              Email or Username
            </label>
          </div>
          <div className="login__form__question">
            Don't want to sign in or create an account?{" "}
          </div>
          <a className="login__form__demo" onClick={this.props.handleDemo}>
            Sign in as demo user
          </a>
          <div className="login__form__btn">
            <div className="login__form__btn__link--heavy">
              {this.props.formLink}
            </div>
            <button
              className="login__form__btn__item"
              onClick={this.props.nextStep}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginUsername;
