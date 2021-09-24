import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import SideBar from "../side_bar/side_bar";
import MainVideoIndex from "./video_index/main_vid_idx_container";
import SearchResultsContainer from "./search_results/search_results_container";
import SubscriptionsContainer from "./subscriptions/subscriptions_container";
import LibraryContainer from "./library/library_container";

const MainPage = ({ sidebarExpanded }) => {
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
      {isLocation("/results") && <SearchResultsContainer />}
    </div>
  );
};

const mapStateToProps = ({ ui: { sidebar } }) => ({
  sidebarExpanded: sidebar === "expanded",
});

export default connect(mapStateToProps, null)(MainPage);
