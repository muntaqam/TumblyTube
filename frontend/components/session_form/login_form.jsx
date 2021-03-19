import React from "react";
import LoginUsername from "./login_username";
import LoginPassword from "./login_password";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      step: "username",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
  }

  // renderErrors() {
  //   return (
  //     <ul>
  //       {this.props.errors.map((err, idx) => (
  //         <li key={idx}>{err}</li>
  //       ))}
  //     </ul>
  //   );
  // }

  nextStep() {
    this.setState({ step: "password" });
  }

  prevStep() {
    this.setState({ step: "username" });
  }

  handleChange(type) {
    return (e) => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign(
      {},
      { username: this.state.username, password: this.state.password }
    );
    this.props.login(user);
  }

  render() {
    const { step } = this.state;
    const { errors, clearErrors, formLink } = this.props;
    const { username, password } = this.state;
    const values = { username, password };

    return (
      <div className="login-form-container">
        {step === "username" ? (
          <LoginUsername
            nextStep={this.nextStep}
            handleChange={this.handleChange("username")}
            errors={errors}
            clearErrors={clearErrors}
            formLink={formLink}
            values={values}
          />
        ) : (
          <LoginPassword
            prevStep={this.prevStep}
            handleChange={this.handleChange("password")}
            handleSubmit={this.handleSubmit}
            errors={errors}
            clearErrors={clearErrors}
            formLink={formLink}
            values={values}
          />
        )}
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

export default LoginForm;
