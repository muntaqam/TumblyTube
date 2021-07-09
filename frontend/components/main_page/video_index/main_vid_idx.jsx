import React from "react";

class MainVideoIndex extends React.Component {
  componentDidMount() {
    this.props.fetchVideos();
  }
  render() {
    if (this.props.videos.length !== 0) {
      return (
        <ul>
          {Object.values(this.props.videos).map((video) => (
            <li>
              {video.id}
              {video.title}
              <svg src={video.videoUrl} alt="" />
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default MainVideoIndex;