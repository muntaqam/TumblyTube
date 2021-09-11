import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { avatarFromInitials } from "../../../util/avatar_util";

const SessionButtonDropDown = ({ currentUser, logout }) => {
  return (
    <>
      <div className='navbar__session__dd__user'>
        <img
          src={avatarFromInitials(currentUser, 50)}
          alt='avatar'
          className='navbar__session__avatar navbar__session__avatar--dd'
        />
        <div className='navbar__session__dd__info'>
          <div className='navbar__session__dd__info__name'>
            {currentUser.username}
          </div>
          <div className='navbar__session__dd__info__email'>
            {currentUser.email}
          </div>
        </div>
      </div>
      <div className='navbar__session__dd__signout' onClick={logout}>
        <ExitToAppIcon
          id='signout-button'
          className='navbar__icon navbar__icon--signout'
        />
        <div className='navbar__session__dd__signout-text'>Sign out</div>
      </div>
    </>
  );
};

export default SessionButtonDropDown;
