import React from "react";
import NavBar from "./nav_bar/nav_bar_container";
import SideBar from "./side_bar/side_bar";
import MainVideoIndex from "./video_index/main_vid_idx";

class MainPage extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="main__top">
          <NavBar />
        </div>
        <div className="main__center">
          <div className="main__center__side">
            <SideBar />
          </div>
          <div className="main__center__videos">
            <MainVideoIndex />
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
