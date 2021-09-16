import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { openModal } from "../../actions/modal_actions";
import Tooltip from "../tooltip/tooltip";
import Dropdown from "../dropdown/dropdown";
import { useHandleClickOutside } from "../../hooks/useHandleClickOutside";
import { expandSidebar, shrinkSidebar } from "../../actions/sidebar_actions";
import { useHandleDropdownPosition } from "../../hooks/useHandleDropdownPosition";

import MenuIcon from "@material-ui/icons/Menu";
import VideoCallOutlineIcon from "@material-ui/icons/VideoCallOutlined";
import SearchBarContainer from "./search_bar/search_bar_container";
import SessionButtonContainer from "./session_button/session_button_container";
import AccountCircle from "@material-ui/icons/AccountCircle";

function NavBar({
  openModal,
  sidebarExpanded,
  shrinkSidebar,
  expandSidebar,
  location,
  history,
  currentUserId,
}) {
  const { showDropdown, triggerRef, dropdownRef } =
    useHandleClickOutside(false);

  const { rightPosition, bottomPosition, leftPosition } =
    useHandleDropdownPosition({ triggerRef, currentUserId });

  const handleUpload = () => {
    if (!currentUserId) return;
    openModal({ mode: "upload" });
  };

  const handleOpenSidebar = () => {
    if (location.pathname.includes("watch") || window.innerWidth <= 650) {
      // open sidebar (Modal) when not in watch page or window width <= 650px
      expandSidebar();
      openModal({ mode: "sidebar" });
    } else {
      // else toggle regular sidebar
      sidebarExpanded ? shrinkSidebar() : expandSidebar();
    }
  };

  if (location.pathname == "/login" || location.pathname == "/signup") {
    return null;
  }
  return (
    <div className='navbar'>
      <div className='navbar__section navbar__section--left'>
        <MenuIcon
          id='menu-button'
          className='navbar__icon navbar__icon--menu'
          onClick={handleOpenSidebar}
        />

        <Link to='/' className='navbar__logoCont'>
          <img className='navbar__logo' src={window.logoURL} />
        </Link>
      </div>

      <div className='navbar__section navbar__section--center'>
        <SearchBarContainer />
      </div>

      <div className='navbar__section navbar__section--right'>
        <div style={{ position: "relative" }}>
          <Tooltip content='Upload'>
            <button
              ref={triggerRef}
              className='upload-button'
              onClick={handleUpload}
            >
              <VideoCallOutlineIcon
                id='upload-button-icon'
                className='navbar__icon navbar__icon--upload'
              />
            </button>
          </Tooltip>

          {!currentUserId && showDropdown && (
            <Dropdown
              ref={dropdownRef}
              mode='upload'
              right={rightPosition}
              bottom={bottomPosition}
              left={leftPosition}
            />
          )}
        </div>

        {currentUserId ? (
          <SessionButtonContainer />
        ) : (
          <Link to='/login' className='navbar__session__login'>
            <AccountCircle id='signin-button' />

            <div className='navbar__session__login__text'>SIGN IN</div>
          </Link>
        )}
      </div>
    </div>
  );
}

const mSTP = ({ session, ui: { sidebar } }) => {
  return {
    currentUserId: session.id,
    sidebarExpanded: sidebar === "expanded",
  };
};

const mDTP = (dispatch) => {
  return {
    openModal: (type) => dispatch(openModal(type)),
    shrinkSidebar: () => dispatch(shrinkSidebar()),
    expandSidebar: () => dispatch(expandSidebar()),
  };
};

export default withRouter(connect(mSTP, mDTP)(NavBar));
