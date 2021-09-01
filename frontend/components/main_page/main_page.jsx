import React, { useContext } from "react";
import { SidebarContext } from "../root";
import SideBar from "./side_bar/side_bar";
import MainVideoIndex from "./video_index/main_vid_idx_container";

const MainPage = () => {
  const { sidebarExpanded, toggleExpanded } = useContext(SidebarContext);

  return (
    <div className={`main main--${sidebarExpanded ? "sidebarExpanded" : null}`}>
      <SideBar />
      <div className='main__borderTop'></div>
      <MainVideoIndex />
    </div>
  );
};

export default MainPage;
