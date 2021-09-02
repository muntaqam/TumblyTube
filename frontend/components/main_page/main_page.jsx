import React, { useContext } from "react";
import { useLocation } from "react-router";
import { SidebarContext } from "../root";
import SideBar from "./side_bar/side_bar";
import MainVideoIndex from "./video_index/main_vid_idx_container";
import Subscriptions from "./subscriptions/subscriptions";
import Library from "./library/library";
import RyanNaing from "./ryan_naing/ryan_naing";

const MainPage = () => {
  const { sidebarExpanded } = useContext(SidebarContext);
  const location = useLocation();

  const isLocation = (url) => {
    if (location.pathname == url) return true;
    else return false;
  };

  return (
    <div className={`main main--${sidebarExpanded ? "sidebarExpanded" : null}`}>
      <SideBar />
      <div className='main__borderTop'></div>
      {isLocation("/") && <MainVideoIndex />}
      {isLocation("/feed/subscriptions") && <Subscriptions />}
      {isLocation("/feed/library") && <Library />}
      {isLocation("/feed/ryannaing") && <RyanNaing />}
    </div>
  );
};

export default MainPage;
