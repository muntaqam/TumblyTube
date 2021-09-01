import React, { useState, useContext } from "react";
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

  return (
    <div
      className={`main__sidebar main__sidebar--${
        sidebarExpanded ? "expanded" : null
      }`}
    >
      <div
        className='sidebar__item sidebar__item--home'
        onClick={() => setShowToggled("home")}
      >
        {showToggled == "home" ? (
          <HomeIcon id='home-icon' />
        ) : (
          <HomeOutlinedIcon id='home-icon' />
        )}
        <p className='sidebar__title'>Home</p>
      </div>
      <div
        className='sidebar__item sidebar__item--subscriptions'
        onClick={() => setShowToggled("subscriptions")}
      >
        {showToggled == "subscriptions" ? (
          <SubscriptionsIcon id='subscriptions-icon' />
        ) : (
          <SubscriptionsOutlinedIcon id='subscriptions-icon' />
        )}
        <p className='sidebar__title'>Subscriptions</p>
      </div>
      <div
        className='sidebar__item sidebar__item--library'
        onClick={() => setShowToggled("library")}
      >
        {showToggled == "library" ? (
          <VideoLibraryIcon id='library-icon' />
        ) : (
          <VideoLibraryOutlinedIcon id='library-icon' />
        )}
        <p className='sidebar__title'>Library</p>
      </div>
      <div
        className='sidebar__item sidebar__item--ryan'
        onClick={() => setShowToggled("ryan")}
      >
        {showToggled == "ryan" ? (
          <SentimentVerySatisfiedIcon id='ryan-icon' />
        ) : (
          <SentimentSatisfiedAltIcon id='ryan-icon' />
        )}
        <p className='sidebar__title'>Ryan Naing</p>
      </div>
    </div>
  );
}
