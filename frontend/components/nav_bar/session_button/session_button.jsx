import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { avatarFromInitials } from "../../../util/avatar_util";
import SessionButtonDropDown from "./session_dropdown";

const SessionButton = ({ logout, currentUser }) => {
  const dropDownRef = useRef();

  const handleClick = (e) => {
    e.stopPropagation();
    dropDownRef.current.toggleDropDown();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  let display;

  if (currentUser) {
    display = (
      <div className='navbar__session'>
        <img
          className='navbar__session__avatar'
          src={avatarFromInitials(currentUser, 32)}
          alt='avatar'
          onClick={handleClick}
        />

        <SessionButtonDropDown
          ref={dropDownRef}
          currentUser={currentUser}
          logout={handleLogout}
        />
      </div>
    );
  } else {
    display = (
      <Link to='/login' className='navbar__session__login'>
        <AccountCircle id='signin-button' />
        <div className='navbar__session__login__text'>SIGN IN</div>
      </Link>
    );
  }

  return display;
};

export default SessionButton;
