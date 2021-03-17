import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
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

  renderEmail() {
    return (
      <>
        <label htmlFor="session-form-email">Email:</label>
          <input type="email"
            id="session-form-email"
            className="session-form-input"
            onChange={this.handleChange("email")}
            value={this.state.email}
          />
        <br />
      </>
    )
  }

  handleChange(type) {
    return (e) => (
      this.setState({
        [type]: e.currentTarget.value,
      })
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.action(user);
  }

  render() {
    return (
      <div className="session-form-container">
        <form onSubmit={this.handleSubmit} className="session-form">
          { this.renderErrors() }
          <label htmlFor="session-form-username">Username:</label>
          <input
            type="text"
            id="session-form-username"
            className="session-form-input"
            onChange={this.handleChange("username")}
            value={this.state.username}
          />
          <br />
          { this.props.formType === "signup" ? this.renderEmail() : null }
          <label htmlFor="session-form-password">Password:</label>
          <input
            type="password"
            id="session-form-password"
            className="session-form-input"
            onChange={this.handleChange("password")}
            value={this.state.password}
          />
          <br />
          <button className="session-form-submit">{this.props.formType}</button>
          <br />
          { this.props.formLink }
        </form>
      </div>
    );
  }
}

export default SessionForm;