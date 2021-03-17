import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SessionForm from "./session_form";
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
    action: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mSTP, mDTP)(SessionForm);
