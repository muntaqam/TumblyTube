import React from "react";
import VideoPlayer from "./video_player";
import SideVideoIndex from "./side_vid_idx";
import NavBar from "../main_page/nav_bar/nav_bar_container";

class VideoShow extends React.Component {
  componentDidMount() {
    this.props.fetchVideos();
  }

  render() {
    if (!this.props.currentVideo) return null;
    let sideVideos = Object.values(this.props.videos).map((vid) => {
      if (vid.id != this.props.currentVideoId) {
        return <SideVideoIndex key={vid.id} video={vid} />;
      }
    });

    return (
      <div>
        <div className='main__top'>
          <NavBar />
        </div>
        <VideoPlayer
          video={this.props.currentVideo}
          videoId={this.props.currentVideoId}
        />
        <div>{this.props.currentVideo.title}</div>
        <div>
          {this.props.currentVideo.createdAt}
          Like Dislike Share
        </div>
        {sideVideos}
      </div>
    );
  }
}

export default VideoShow;
