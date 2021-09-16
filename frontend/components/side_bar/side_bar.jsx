import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import { closeModal } from "../../actions/modal_actions";
import { shrinkSidebar } from "../../actions/sidebar_actions";
import { useListenViewport } from "../../hooks/useListenViewport";

import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import VideoLibraryOutlinedIcon from "@material-ui/icons/VideoLibraryOutlined";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

function SideBar({ sidebarExpanded, shrinkSidebar, modal, closeModal }) {
  const sidebarRef = useRef(null);
  const location = useLocation();
  const { feedtype } = useParams();
  const [showToggled, setShowToggled] = useState("");
  const { viewportWidth } = useListenViewport();

  // setShowToggled on mount based on feedType param
  useEffect(() => {
    if (location.pathname == "/") {
      setShowToggled("home");
    } else {
      setShowToggled(feedtype);
    }

    return () => setShowToggled("");
  }, [location.pathname]);

  // shrink sidebar at 1312px, if not modal and expanded
  useEffect(() => {
    if (viewportWidth < 1312) {
      if (!modal && sidebarExpanded) shrinkSidebar();
    }
  }, [viewportWidth]);

  const changeFeed = (dir) => {
    setShowToggled(dir);
  };

  const handleCloseModal = () => {
    closeModal();
    shrinkSidebar();
  };

  // animation on mounted and unmounted
  const mountedModalStyle = {
    animation: "sidebarAnimation 300ms ease-in",
  };

  // conditional class names for each sidebar__item
  const isHome = showToggled === "home";
  const isSubscriptions = showToggled === "subscriptions";
  const isLibrary = showToggled === "library";
  const isRyan = showToggled === "ryannaing";

  return (
    <div
      ref={sidebarRef}
      className={`main__sidebar main__sidebar--${
        sidebarExpanded && "expanded"
      } ${modal && "main__sidebar--modal"}`}
      style={modal && mountedModalStyle}
      onClick={(e) => e.stopPropagation()}
    >
      {modal && (
        <div className='sidebar__modalNav'>
          <MenuIcon
            id='menu-button'
            className='navbar__icon navbar__icon--menu'
            onClick={handleCloseModal}
          />
          <Link to='/' className='navbar__logoCont'>
            <img className='navbar__logo' src={window.logoURL} />
          </Link>
        </div>
      )}
      <Link
        to='/'
        className={`sidebar__item sidebar__item--${isHome ? "active" : null}`}
        onClick={() => changeFeed("home")}
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
        onClick={() => changeFeed("subscriptions")}
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
        onClick={() => changeFeed("library")}
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
        onClick={() => changeFeed("ryannaing")}
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

const mSTP = ({ ui: { sidebar } }) => {
  return {
    sidebarExpanded: sidebar === "expanded",
  };
};

const mDTP = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal("sidebar")),
    shrinkSidebar: () => dispatch(shrinkSidebar()),
  };
};

export default connect(mSTP, mDTP)(SideBar);
