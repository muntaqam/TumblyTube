import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import VideoLibraryOutlinedIcon from "@material-ui/icons/VideoLibraryOutlined";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { SidebarContext } from "../root";
import { closeModal } from "../../actions/modal_actions";

function SideBar({ modal, closeModal }) {
  const location = useLocation();
  const { feedtype } = useParams();
  const [showToggled, setShowToggled] = useState("");
  const { sidebarExpanded, toggleExpanded } = useContext(SidebarContext);

  useEffect(() => {
    // extend sidebar if it's a modal
    if (modal) toggleExpanded();

    // setShowToggled on mount based on feedType param
    if (location.pathname == "/") {
      setShowToggled("home");
    } else {
      setShowToggled(feedtype);
    }
  }, []);

  const handleClick = (dir) => {
    setShowToggled(dir);
  };

  const isHome = showToggled == "home";
  const isSubscriptions = showToggled == "subscriptions";
  const isLibrary = showToggled == "library";
  const isRyan = showToggled == "ryan";

  return (
    <div
      className={`main__sidebar main__sidebar--${
        sidebarExpanded ? "expanded" : null
      }`}
    >
      {modal && (
        <div className='sidebar__modalNav'>
          <MenuIcon
            id='menu-button'
            className='navbar__icon navbar__icon--menu'
            onClick={closeModal}
          />
          <Link to='/'>
            <img className='navbar__logo' src={window.logoURL} />
          </Link>
        </div>
      )}
      <Link
        to='/'
        className={`sidebar__item sidebar__item--${isHome ? "active" : null}`}
        onClick={() => handleClick("home")}
      >
        {isHome ? (
          <HomeIcon id='home-icon' />
        ) : (
          <HomeOutlinedIcon id='home-outline-icon' />
        )}
        <p className='sidebar__title'>Home</p>
      </Link>
      <Link
        to='/feed/subscriptions'
        className={`sidebar__item sidebar__item--${
          isSubscriptions ? "active" : null
        }`}
        onClick={() => handleClick("subscriptions")}
      >
        {isSubscriptions ? (
          <SubscriptionsIcon id='subscriptions-icon' />
        ) : (
          <SubscriptionsOutlinedIcon id='subscriptions-outline-icon' />
        )}
        <p className='sidebar__title'>Subscriptions</p>
      </Link>
      <Link
        to='/feed/library'
        className={`sidebar__item sidebar__item--${
          isLibrary ? "active" : null
        }`}
        onClick={() => handleClick("library")}
      >
        {isLibrary ? (
          <VideoLibraryIcon id='library-icon' />
        ) : (
          <VideoLibraryOutlinedIcon id='library-outline-icon' />
        )}
        <p className='sidebar__title'>Library</p>
      </Link>
      <Link
        to='/feed/ryannaing'
        className={`sidebar__item sidebar__item--${isRyan ? "active" : null}`}
        onClick={() => handleClick("ryan")}
      >
        {isRyan ? (
          <SentimentVerySatisfiedIcon id='ryan-icon' />
        ) : (
          <SentimentSatisfiedAltIcon id='ryan-outline-icon' />
        )}
        <p className='sidebar__title'>Ryan Naing</p>
      </Link>
    </div>
  );
}

const mDTP = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal("sidebar")),
  };
};

export default connect(null, mDTP)(SideBar);