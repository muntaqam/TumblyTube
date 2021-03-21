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

  render() {
    return (
      <div id="signup-form-container">
        {console.log(this.state.errors)}
        <form>
          <header className="signup-form-header">
            <img className="session-logo" src={window.tumbleLogoURL} />
            <h2 className="session-title">Create your Tumble Account</h2>
            <span className="session-subtitle">to continue to TumblyTube</span>
          </header>
          <div className="signup-form-item__username">
            <input
              className="session-form-input"
              onChange={this.handleChange("username")}
              value={this.state.username}
              placeholder="Username"
              aria-placeholder="Username"
            />
          </div>
          <div className="signup-form-item__email">
            <input
              type="email"
              className="session-form-input"
              onChange={this.handleChange("email")}
              value={this.state.email}
              placeholder="Your email address"
              aria-placeholder="Your email address"
            />
          </div>
          <div className="signup-form-item__password">
            <input
              type="password"
              className="session-form-input"
              onChange={this.handleChange("password")}
              value={this.state.password}
              placeholder="Password"
              aria-placeholder="Password"
            />
          </div>
          <div className="signup-form-item__confirmPW">
            <input
              type="password"
              className="session-form-input"
              onChange={this.handleChange("confirmPW")}
              value={this.state.confirmPW}
              placeholder="Confirm"
              aria-placeholder="Confirm"
            />
          </div>
          <div className="signup-form-bottom">
            {this.props.formLink}
            <span>or</span>
            <button>Sign in as demo user</button>
            <button className="session-form-btn" onClick={this.handleSubmit}>
              Sign Up
            </button>
          </div>
        </form>
        <footer className="session__footer">
          <div className="session__footer__lang">
            <span className="session__footer__lang__item">
              English (United States)
              <span className="material-icons">arrow_drop_down</span>
            </span>
          </div>
          <ul className="session__footer__list">
            <li>
              <a href="#" className="session__footer__list__item">
                Project Repo
              </a>
            </li>
            <li>
              <a href="#" className="session__footer__list__item">
                Github
              </a>
            </li>
            <li>
              <a href="#" className="session__footer__list__item">
                LinkedIn
              </a>
            </li>
          </ul>
        </footer>
      </div>
    );
  }
}

export default SignUpForm;
