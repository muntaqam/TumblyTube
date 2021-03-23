import React from "react";
import LoginUsername from "./login_username";
import LoginPassword from "./login_password";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: "username",
    };

    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  nextStep() {
    this.setState({ step: "password" });
  }

  prevStep() {
    this.setState({ step: "username" });
  }

  handleDemo() {
    this.props.login({ email: "Demo User", password: "demouser123" });
  }

  render() {
    const { step } = this.state;
    const {
      errors,
      clearErrors,
      formLink,
      identifyUser,
      identifiedUser,
      login,
    } = this.props;

    return (
      <div className="session">
        {step === "username" ? (
          <LoginUsername
            nextStep={this.nextStep}
            identifyUser={identifyUser}
            handleDemo={this.handleDemo}
            errors={errors}
            clearErrors={clearErrors}
            formLink={formLink}
          />
        ) : (
          <LoginPassword
            identifiedUser={identifiedUser}
            login={login}
            prevStep={this.prevStep}
            handleDemo={this.handleDemo}
            errors={errors}
            clearErrors={clearErrors}
            formLink={formLink}
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
