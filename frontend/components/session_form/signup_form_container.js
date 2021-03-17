import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SessionForm from "./session_form";
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
    action: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mSTP, mDTP)(SessionForm);
