import React from "react";
import { Link } from "react-router-dom";

class LoginPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign(
      {},
      {
        username: this.props.identifiedUser.username,
        password: this.state.password,
      }
    );
    this.props.login(user);
  }

  render() {
    let showErr;
    if (this.props.errors.length > 0) {
      showErr = (
        <div className="session__errors">
          <span className="material-icons">error</span>
          <span className="session__errors__type">{this.props.errors[0]}</span>
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
            Hi {this.props.identifiedUser.username}
          </h2>
          <div
            className="session__header__username"
            onClick={this.props.prevStep}
          >
            <span className="session__header__subtitle">
              {this.props.identifiedUser.email}
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
                (showErr ? " signup__form__input__item--error" : "")
              }
              onChange={this.handleChange}
              placeholder=" "
              value={this.state.password}
            />
            <label className="login__form__input__label">Password</label>
            {showErr}
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
              onClick={this.handleSubmit}
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
