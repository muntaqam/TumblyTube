import React from "react";
import VideoPlayer from "./video_player";

class VideoShow extends React.Component {
  componentDidMount() {
    this.props.fetchVideos();
  }

  render() {
    return (
      <VideoPlayer
        video={this.props.currentVideo}
        videoId={this.props.currentVideoId}
      />
    );
  }
}

export default VideoShow;
