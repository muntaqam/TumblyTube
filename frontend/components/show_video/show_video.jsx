import React from "react";
import VideoPlayer from "./video_player";
import SideVideoIndex from "./side_vid_idx";

class VideoShow extends React.Component {
  componentDidMount() {
    this.props.fetchVideos();
  }

  render() {
    if (this.props.videos.length == 0) return null;
    let sideVideos = Object.values(this.props.videos).map((vid) => {
      if (vid.id != this.props.currentVideoId) {
        return <SideVideoIndex key={vid.id} video={vid} />;
      }
    });

    return (
      <div>
        <VideoPlayer
          video={this.props.currentVideo}
          videoId={this.props.currentVideoId}
        />
        {sideVideos}
      </div>
    );
  }
}

export default VideoShow;
