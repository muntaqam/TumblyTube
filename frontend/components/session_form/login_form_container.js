import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoginForm from "./login_form";
import { login, clearErrors } from "../../actions/session_actions";

const mSTP = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "login",
    formLink: <Link to="/signup">Create account</Link>,
  };
};

const mDTP = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mSTP, mDTP)(LoginForm);
