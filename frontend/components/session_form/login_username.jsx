import React from "react";
import { Link } from "react-router-dom";

class LoginUsername extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      errors: [],
    };

    this.handleNextStep = this.handleNextStep.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleNextStep(e) {
    e.preventDefault();
    this.props.clearErrors();
    if (this.state.inputValue === "") {
      this.setState({ errors: ["Username or Email can't be blank"] });
    } else {
      this.props
        .identifyUser(this.state.inputValue)
        .then(() => this.props.nextStep());
    }
  }

  render() {
    let errors = this.props.errors.concat(this.state.errors);
    let showErr;
    if (errors.length > 0) {
      showErr = (
        <div className='session__errors'>
          <span className='material-icons'>error</span>
          <span className='session__errors__type'>{errors[0]}</span>
        </div>
      );
    }

    return (
      <div className='login login--container'>
        <header className='session__header session__header__login'>
          <Link to='/' className='session__header__logo__container'>
            <img
              className='session__header__logo__img'
              src={window.tumbleLogoURL}
            />
          </Link>
          <h2 className='session__header__title'>Sign in</h2>
          <span className='session__header__subtitle'>
            to continue to TumblyTube
          </span>
        </header>
        <form className='login__form'>
          <div className='login__form__input'>
            <input
              className={
                "login__form__input__item" +
                (showErr ? " signup__form__input__item--error" : "")
              }
              onChange={this.handleChange}
              placeholder=' '
              value={this.state.inputValue}
            />
            <label className='login__form__input__label'>
              Email or Username
            </label>
            {showErr}
          </div>
          <div className='login__form__question'>
            Don't want to sign in or create an account?{" "}
          </div>
          <a className='login__form__demo' onClick={this.props.handleDemo}>
            Sign in as demo user
          </a>
          <div className='login__form__btn'>
            <div className='login__form__btn__link--heavy'>
              {this.props.formLink}
            </div>
            <button
              className='login__form__btn__item'
              onClick={this.handleNextStep}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginUsername;
