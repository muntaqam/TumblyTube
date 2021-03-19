import React from "react";

class LoginPassword extends React.Component {
  render() {
    return (
      <div className="login-input-container">
        <h1 className="session-title">Hi, {this.props.values.username}</h1>
        <span className="login-previous-btn" onClick={this.props.prevStep}>
          {this.props.values.username}
        </span>
        <form>
          <input
            type="password"
            className="login-form-input"
            onChange={this.props.handleChange}
            value={this.props.values.password}
            placeholder="Enter your password"
          />
          {this.props.formLink}
          <button className="login-form-btn" onClick={this.props.handleSubmit}>
            Sign In
          </button>
          <span>or</span>
          <span className="demo-user">Sign in as demo user</span>
        </form>
      </div>
    );
  }
}

export default LoginPassword;
