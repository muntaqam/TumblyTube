import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import VideoLibraryOutlinedIcon from "@material-ui/icons/VideoLibraryOutlined";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { SidebarContext } from "../../root";

export default function SideBar() {
  const [showToggled, setShowToggled] = useState("home");
  const { sidebarExpanded, toggleExpanded } = useContext(SidebarContext);

  const handleClick = (dir) => {
    setShowToggled(dir);
  };

  return (
    <div
      className={`main__sidebar main__sidebar--${
        sidebarExpanded ? "expanded" : null
      }`}
    >
      <Link
        to='/'
        className={`sidebar__item sidebar__item--${
          showToggled == "home" ? "active" : null
        }`}
        onClick={() => handleClick("home")}
      >
        {showToggled == "home" ? (
          <HomeIcon id='home-icon' />
        ) : (
          <HomeOutlinedIcon id='home-outline-icon' />
        )}
        <p className='sidebar__title'>Home</p>
      </Link>
      <Link
        to='/feed/subscriptions'
        className={`sidebar__item sidebar__item--${
          showToggled == "subscriptions" ? "active" : null
        }`}
        onClick={() => handleClick("subscriptions")}
      >
        {showToggled == "subscriptions" ? (
          <SubscriptionsIcon id='subscriptions-icon' />
        ) : (
          <SubscriptionsOutlinedIcon id='subscriptions-outline-icon' />
        )}
        <p className='sidebar__title'>Subscriptions</p>
      </Link>
      <Link
        to='/feed/library'
        className={`sidebar__item sidebar__item--${
          showToggled == "library" ? "active" : null
        }`}
        onClick={() => handleClick("library")}
      >
        {showToggled == "library" ? (
          <VideoLibraryIcon id='library-icon' />
        ) : (
          <VideoLibraryOutlinedIcon id='library-outline-icon' />
        )}
        <p className='sidebar__title'>Library</p>
      </Link>
      <Link
        to='/feed/ryannaing'
        className={`sidebar__item sidebar__item--${
          showToggled == "ryan" ? "active" : null
        }`}
        onClick={() => handleClick("ryan")}
      >
        {showToggled == "ryan" ? (
          <SentimentVerySatisfiedIcon id='ryan-icon' />
        ) : (
          <SentimentSatisfiedAltIcon id='ryan-outline-icon' />
        )}
        <p className='sidebar__title'>Ryan Naing</p>
      </Link>
    </div>
  );
}
