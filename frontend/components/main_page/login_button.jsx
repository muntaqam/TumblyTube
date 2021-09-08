import React from "react";
import { Link } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";

export default function LoginButton() {
  return (
    <Link to='/login' className='navbar__session__login'>
      <AccountCircle id='signin-button' />
      <div className='navbar__session__login__text'>SIGN IN</div>
    </Link>
  );
}
