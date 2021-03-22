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
    this.handleDemo = this.handleDemo.bind(this);
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

  handleDemo() {
    this.props.login({ username: "demo user", password: "demouser123" });
  }

  render() {
    const { step } = this.state;
    const { errors, clearErrors, formLink } = this.props;
    const { username, password } = this.state;
    const values = { username, password };

    return (
      <div className="session">
        {step === "username" ? (
          <LoginUsername
            nextStep={this.nextStep}
            handleChange={this.handleChange("username")}
            handleDemo={this.handleDemo}
            errors={errors}
            clearErrors={clearErrors}
            formLink={formLink}
            values={values}
          />
        ) : (
          <LoginPassword
            prevStep={this.prevStep}
            handleChange={this.handleChange("password")}
            handleDemo={this.handleDemo}
            handleSubmit={this.handleSubmit}
            errors={errors}
            clearErrors={clearErrors}
            formLink={formLink}
            values={values}
          />
        )}
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
    );
  }
}

export default LoginForm;
