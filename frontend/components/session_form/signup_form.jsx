import React from "react";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPW: "",
      errors: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((err, idx) => (
          <li key={idx}>{err}</li>
        ))}
      </ul>
    );
  }

  handleChange(type) {
    return (e) =>
      this.setState({
        [type]: e.target.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPW) {
      this.setState({ errors: ["Passwords do not match"] });
    } else {
      const user = Object.assign(
        {},
        {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        }
      );
      this.props.signup(user);
    }
  }

  handleDemo() {
    this.props.login({ username: "demo user", password: "demouser123" });
  }

  render() {
    return (
      <div className="session">
        <div className="signup">
          <div className="signup__main">
            <div className="signup__left">
              {console.log(this.state.errors)}
              <header className="session__header session__header__signup">
                <img
                  className="session__header__logo"
                  src={window.tumbleLogoURL}
                />
                <h2 className="session__header__title">
                  Create your Tumble Account
                </h2>
                <span className="session__header__subtitle">
                  to continue to TumblyTube
                </span>
              </header>
              <form className="signup__form">
                <div className="signup__form__input">
                  <input
                    className="signup__form__input__item"
                    onChange={this.handleChange("username")}
                    value={this.state.username}
                  />
                  <label className="signup__form__input__label">Username</label>
                </div>
                <div className="signup__form__input">
                  <input
                    type="email"
                    className="signup__form__input__item"
                    onChange={this.handleChange("email")}
                    value={this.state.email}
                  />
                  <label className="signup__form__input__label">
                    Your email address
                  </label>
                </div>
                <a
                  className="signup__form__demo"
                  onClick={this.props.handleDemo}
                >
                  Sign in as Demo user instead
                </a>
                <div className="signup__form__password">
                  <div className="signup__form__input">
                    <input
                      type="password"
                      className="signup__form__input__item"
                      onChange={this.handleChange("password")}
                      value={this.state.password}
                    />
                    <label className="signup__form__input__label">
                      Password
                    </label>
                  </div>
                  <div className="signup__form__input">
                    <input
                      type="password"
                      className="signup__form__input__item"
                      onChange={this.handleChange("confirmPW")}
                      value={this.state.confirmPW}
                    />
                    <label className="signup__form__input__label">
                      Confirm
                    </label>
                  </div>
                </div>
                <div className="signup__form__input__pw-confirm">
                  <span>
                    Use 6 or more characters with a mix of letters, numbers &
                    symbols
                  </span>
                </div>
                <div className="signup__form__btn">
                  <div className="signup__form__btn__link">
                    {this.props.formLink}
                  </div>
                  <button
                    className="signup__form__btn__item"
                    onClick={this.handleSubmit}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
            <div className="signup__right">
              <figure>
                <img src={window.signupURL} width="244" height="244" />
                <figcaption>
                  One account. All of Tumble working for you.
                </figcaption>
              </figure>
            </div>
          </div>
          <footer className="session__footer">
            <span className="session__footer__lang">
              English (United States)
              <span className="material-icons">arrow_drop_down</span>
            </span>

            <ul className="session__footer__list">
              <li>
                <a
                  href="https://github.com/nyan9/TumblyTube"
                  className="session__footer__list__item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ProjectRepo
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/nyan9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/nyannaing/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </footer>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
