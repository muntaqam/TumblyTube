import React from "react";
import MainVideoIndexItem from "./main_vid_idx_item";

class MainVideoIndex extends React.Component {
  componentDidMount() {
    this.props.fetchVideos();
  }

  render() {
    if (this.props.videos.length !== 0) {
      return (
        <ul>
          {Object.values(this.props.videos).map((video) => (
            <li key={video.id}>
              <MainVideoIndexItem video={video} />
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default MainVideoIndex;
