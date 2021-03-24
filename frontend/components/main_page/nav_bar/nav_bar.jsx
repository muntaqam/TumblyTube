import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import SearchBar from "./search_bar";

export default function NavBar() {
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
        <VideoCallIcon
          id="upload-button"
          className="navbar__icon navbar__icon--upload"
        />
        <div className="navbar__tooltip navbar__tooltip--upload">Upload</div>
        <div className="navbar__avatar">D</div>
      </div>
    </div>
  );
}
