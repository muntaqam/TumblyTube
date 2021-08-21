import React from "react";
import MainVideoIndexItem from "./main_vid_idx_item";

class MainVideoIndex extends React.Component {
  componentDidMount() {
    if (!this.props.videos.length) this.props.fetchVideos();
  }

  render() {
    return (
      <ul>
        {this.props.videos.map((video) => (
          <li key={video.id}>
            <MainVideoIndexItem video={video} />
          </li>
        ))}
      </ul>
    );
  }
}

export default MainVideoIndex;
