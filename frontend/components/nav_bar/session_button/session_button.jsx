import React, { useRef, useState } from "react";
import { avatarFromInitials } from "../../../util/avatar_util";
import SessionButtonDropDown from "./session_dropdown";
import { useHandleClickOutside } from "../../../hooks/useHandleClickOutside";

const SessionButton = ({ logout, currentUser }) => {
  const dropDownRef = useRef();
  const [showDropDown, setShowDropDown] = useState(false);

  useHandleClickOutside({ dropDownRef, showDropDown, setShowDropDown });

  const handleClick = (e) => {
    e.stopPropagation();
    setShowDropDown(!showDropDown);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div ref={dropDownRef} className='navbar__session'>
      <img
        className='navbar__session__avatar'
        src={avatarFromInitials(currentUser, 32)}
        alt='avatar'
        onClick={handleClick}
      />

      {showDropDown && (
        <SessionButtonDropDown
          currentUser={currentUser}
          logout={handleLogout}
        />
      )}
    </div>
  );
};

export default SessionButton;
