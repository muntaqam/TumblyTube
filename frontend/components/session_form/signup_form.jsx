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
          <h1 className="session-title">Create your Tumble Account</h1>
          <span className="session-subtitle">to continue to TumblyTube</span>
          <input
            className="session-form-input"
            onChange={this.handleChange("username")}
            value={this.state.username}
            placeholder="Username"
          />
          <input
            type="email"
            className="session-form-input"
            onChange={this.handleChange("email")}
            value={this.state.email}
            placeholder="Your email address"
          />
          <input
            type="password"
            className="session-form-input"
            onChange={this.handleChange("password")}
            value={this.state.password}
            placeholder="Password"
          />
          <input
            type="password"
            className="session-form-input"
            onChange={this.handleChange("confirmPW")}
            value={this.state.confirmPW}
            placeholder="Confirm"
          />
          {this.props.formLink}
          <span>or</span>
          <button>Sign in as demo user</button>
          <button className="session-form-btn" onClick={this.handleSubmit}>
            Sign Up
          </button>
        </form>
        <footer id="session-footer">
          <span id="session-footer-lang">English (United States)</span>
          <ul id="session-personal-links">
            <li>
              <a href="#">Project Repo</a>
            </li>
            <li>
              <a href="#">Github</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
          </ul>
        </footer>
      </div>
    );
  }
}

export default SignUpForm;
