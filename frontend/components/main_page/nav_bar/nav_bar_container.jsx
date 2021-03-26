import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import SearchBar from "./search_bar";
import SessionButtonContainer from "./session_button_container";
import { openModal } from "../../../actions/modal_actions";
import { connect } from "react-redux";

function NavBar(props) {
  return (
    <div className="navbar">
      <div className="navbar navbar--left">
        <MenuIcon
          id="menu-button"
          className="navbar__icon navbar__icon--menu"
        />
        <Link to="/">
          <img className="navbar__logo" src={window.logoURL} />
        </Link>
      </div>
      <div className="navbar navbar--center">
        <SearchBar />
      </div>
      <div className="navbar navbar--right">
        <button className="upload-button" onClick={props.openModal}>
          <VideoCallIcon
            id="upload-button-icon"
            className="navbar__icon navbar__icon--upload"
          />
        </button>
        <div className="navbar__tooltip navbar__tooltip--upload">Upload</div>
        <SessionButtonContainer />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch(openModal("upload")),
  };
};

export default connect(null, mapDispatchToProps)(NavBar);
