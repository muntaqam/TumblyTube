import React from "react";
import { Link, withRouter } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import SearchBar from "./search_bar_container";
import SessionButtonContainer from "./session_button_container";
import { openModal } from "../../../actions/modal_actions";
import { connect } from "react-redux";

function NavBar({ openModal, location, history, currentUser }) {
  if (location.pathname == "/login" || location.pathname == "/signup") {
    return null;
  }

  function handleClick() {
    if (!currentUser) history.push("/login");
    else openModal();
  }

  return (
    <div className='navbar'>
      <div className='navbar__section navbar__section--left'>
        <MenuIcon
          id='menu-button'
          className='navbar__icon navbar__icon--menu'
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
          <VideoCallIcon
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
