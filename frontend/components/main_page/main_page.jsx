import React, { useContext } from "react";
import { useParams, useLocation } from "react-router";
import { SidebarContext } from "../root";
import SideBar from "../side_bar/side_bar";
import MainVideoIndex from "./video_index/main_vid_idx_container";
import Subscriptions from "./subscriptions/subscriptions";
import Library from "./library/library";
import RyanNaing from "./ryan_naing/ryan_naing";

const MainPage = () => {
  const { sidebarExpanded } = useContext(SidebarContext);
  const location = useLocation();
  const { feedtype } = useParams();

  const isLocation = (url) => {
    if (feedtype == url) return true;
    else return false;
  };

  return (
    <div className={`main main--${sidebarExpanded ? "sidebarExpanded" : null}`}>
      <SideBar />
      <div className='main__borderTop'></div>
      {location.pathname == "/" && <MainVideoIndex />}
      {isLocation("subscriptions") && <Subscriptions />}
      {isLocation("library") && <Library />}
      {isLocation("ryannaing") && <RyanNaing />}
    </div>
  );
};

export default MainPage;
