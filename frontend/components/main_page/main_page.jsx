import React from "react";
import SideBar from "./side_bar/side_bar";
import MainVideoIndex from "./video_index/main_vid_idx_container";

class MainPage extends React.Component {
  render() {
    return (
      <div className='main'>
        <SideBar />
        <MainVideoIndex />
      </div>
    );
  }
}

export default MainPage;
