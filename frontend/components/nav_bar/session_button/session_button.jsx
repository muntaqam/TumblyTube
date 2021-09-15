import React from "react";
import { avatarFromInitials } from "../../../util/avatar_util";
import SessionButtonDropDown from "./session_dropdown";
import { useHandleClickOutside } from "../../../hooks/useHandleClickOutside";

const SessionButton = ({ logout, currentUser }) => {
  const { showDropdown, triggerRef, dropdownRef } =
    useHandleClickOutside(false);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className='navbar__session'>
      <img
        ref={triggerRef}
        className='navbar__session__avatar'
        src={avatarFromInitials(currentUser, 32)}
        alt='avatar'
      />

      {showDropdown && (
        <SessionButtonDropDown
          ref={dropdownRef}
          currentUser={currentUser}
          logout={handleLogout}
        />
      )}
    </div>
  );
};

export default SessionButton;
