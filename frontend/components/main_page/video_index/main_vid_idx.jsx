import React from "react";
import MainVideoIndexItem from "./main_vid_idx_item";

class MainVideoIndex extends React.Component {
  componentDidMount() {
    if (!this.props.videos.length) this.props.fetchVideos();
  }

  render() {
    return (
      <div className='main__index'>
        {this.props.videos.map((video) => (
          <MainVideoIndexItem
            key={video.id}
            video={video}
            creator={video.creator}
          />
        ))}
      </div>
    );
  }
}

export default MainVideoIndex;
