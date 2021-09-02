import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallOutlineIcon from "@material-ui/icons/VideoCallOutlined";
import SearchBar from "./search_bar_container";
import SessionButtonContainer from "./session_button_container";
import { openModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import { SidebarContext } from "../root";

function NavBar({ openModal, location, history, currentUser }) {
  const { sidebarExpended, toggleExpanded } = useContext(SidebarContext);

  if (location.pathname == "/login" || location.pathname == "/signup") {
    return null;
  }

  const handleClick = () => {
    if (!currentUser) history.push("/login");
    else openModal();
  };

  const handleOpenSidebar = () => {
    if (location.pathname.includes("watch")) console.log("WATCHPAGE");
    else toggleExpanded();
  };

  return (
    <div className='navbar'>
      <div className='navbar__section navbar__section--left'>
        <MenuIcon
          id='menu-button'
          className='navbar__icon navbar__icon--menu'
          onClick={handleOpenSidebar}
        />
        <Link to='/'>
          <img className='navbar__logo' src={window.logoURL} />
        </Link>
      </div>
      <div className='navbar__section navbar__section--center'>
        <SearchBar />
      </div>
      <div className='navbar__section navbar__section--right'>
        <button className='upload-button' onClick={handleClick}>
          <VideoCallOutlineIcon
            id='upload-button-icon'
            className='navbar__icon navbar__icon--upload'
          />
        </button>
        <div className='navbar__tooltip navbar__tooltip--upload'>Upload</div>
        <SessionButtonContainer />
      </div>
    </div>
  );
}

const mSTP = ({ session }) => {
  return {
    currentUser: session.id,
  };
};

const mDTP = (dispatch) => {
  return {
    openModal: () => dispatch(openModal("upload")),
  };
};

export default withRouter(connect(mSTP, mDTP)(NavBar));
