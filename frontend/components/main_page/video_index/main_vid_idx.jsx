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
              <video height="170" width="303" controls >
                <source src={video.videoUrl}/>
              </video>
              {video.title}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default MainVideoIndex;