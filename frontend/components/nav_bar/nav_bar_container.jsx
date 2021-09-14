import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { openModal } from "../../actions/modal_actions";
import { SidebarContext } from "../root";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallOutlineIcon from "@material-ui/icons/VideoCallOutlined";
import SearchBarContainer from "./search_bar/search_bar_container";
import SessionButtonContainer from "./session_button/session_button_container";
import AccountCircle from "@material-ui/icons/AccountCircle";

function NavBar({ openModal, location, history, currentUserId }) {
  const { sidebarExpanded, toggleExpanded } = useContext(SidebarContext);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const updateMedia = () => {
    setViewportWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [viewportWidth]);

  const handleUpload = () => {
    if (!currentUserId) history.push("/login");
    else openModal("upload");
  };

  const handleOpenSidebar = () => {
    if (location.pathname.includes("watch")) {
      if (!sidebarExpanded) toggleExpanded();
      openModal("sidebar");
    } else {
      toggleExpanded();
    }

    if (viewportWidth <= 650) {
      if (!sidebarExpanded) toggleExpanded();
      openModal("sidebar");
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
        <button className='upload-button' onClick={handleUpload}>
          <VideoCallOutlineIcon
            id='upload-button-icon'
            className='navbar__icon navbar__icon--upload'
          />
        </button>
        <div className='navbar__tooltip navbar__tooltip--upload'>Upload</div>
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

const mSTP = ({ session }) => {
  return {
    currentUserId: session.id,
  };
};

const mDTP = (dispatch) => {
  return {
    openModal: (type) => dispatch(openModal(type)),
  };
};

export default withRouter(connect(mSTP, mDTP)(NavBar));
