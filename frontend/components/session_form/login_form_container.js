import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoginForm from "./login_form";
import {
  login,
  identifyUser,
  clearErrors,
} from "../../actions/session_actions";

const mSTP = ({ session, errors }) => {
  return {
    identifiedUser: session.identifiedUser,
    errors: errors.session,
    formLink: <Link to="/signup">Create account</Link>,
  };
};

const mDTP = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    identifyUser: (type) => dispatch(identifyUser(type)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mSTP, mDTP)(LoginForm);
