import React from "react";

class LoginUsername extends React.Component {
  render() {
    return (
      <div className="login-input-container">
        {/* {this.renderErrors()} */}
        <div className="login-input-container username">
          <h1 className="session-title">Sign in</h1>
          <span className="session-subtitle">to continue to TumblyTube</span>
          <form className="login-form">
            <input
              className="session-form-input"
              onChange={this.props.handleChange}
              value={this.props.values.username}
              placeholder="Username"
            />
            <span className="demo-user">Sign in as demo user</span>
            <span>or</span>
            {this.props.formLink}
            <button className="session-form-btn" onClick={this.props.nextStep}>
              Next
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginUsername;
