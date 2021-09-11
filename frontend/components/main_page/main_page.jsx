import React, { useContext } from "react";
import { useParams, useLocation } from "react-router";
import { SidebarContext } from "../root";
import SideBar from "../side_bar/side_bar";
import MainVideoIndex from "./video_index/main_vid_idx_container";
import SearchResultsContainer from "./search_results/search_results_container";
import SubscriptionsContainer from "./subscriptions/subscriptions_container";
import LibraryContainer from "./library/library_container";
import RyanNaing from "./ryan_naing/ryan_naing";

const MainPage = () => {
  const { sidebarExpanded } = useContext(SidebarContext);
  const location = useLocation();

  const isLocation = (pathname) => {
    if (location.pathname == pathname) return true;
    else return false;
  };

  return (
    <div className={`main main--${sidebarExpanded ? "sidebarExpanded" : null}`}>
      <SideBar />
      <div className='main__borderTop'></div>
      {isLocation("/") && <MainVideoIndex />}
      {isLocation("/feed/subscriptions") && <SubscriptionsContainer />}
      {isLocation("/feed/library") && <LibraryContainer />}
      {isLocation("/feed/ryannaing") && <RyanNaing />}
      {isLocation("/results") && <SearchResultsContainer />}
    </div>
  );
};

export default MainPage;
