import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignUpForm from "./signup_form";
import { login, signup, clearErrors } from "../../actions/session_actions";

const mSTP = ({ errors }) => {
  return {
    errors: errors.session,
    formLink: <Link to="/login">Sign in instead</Link>,
  };
};

const mDTP = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors()),
    login: (user) => dispatch(login(user)),
  };
};

export default connect(mSTP, mDTP)(SignUpForm);
