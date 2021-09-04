import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallOutlineIcon from "@material-ui/icons/VideoCallOutlined";
import SearchBar from "./search_bar_container";
import SessionButtonContainer from "./session_button_container";
import { openModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import { SidebarContext } from "../root";

function NavBar({ openModal, location, history, currentUser }) {
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
    if (!currentUser) history.push("/login");
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
        <Link to='/'>
          <img className='navbar__logo' src={window.logoURL} />
        </Link>
      </div>
      <div className='navbar__section navbar__section--center'>
        <SearchBar />
      </div>
      <div className='navbar__section navbar__section--right'>
        <button className='upload-button' onClick={handleUpload}>
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
    openModal: (type) => dispatch(openModal(type)),
  };
};

export default withRouter(connect(mSTP, mDTP)(NavBar));
