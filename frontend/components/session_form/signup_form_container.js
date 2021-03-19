import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignUpForm from "./signup_form";
import { signup, clearErrors } from "../../actions/session_actions";

const mSTP = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "signup",
    formLink: <Link to="/login">Sign in instead</Link>,
  };
};

const mDTP = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mSTP, mDTP)(SignUpForm);
