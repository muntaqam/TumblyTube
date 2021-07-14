import React from "react";
import { Link } from "react-router-dom";

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
              <Link to={`/videos/${video.id}`}>
                <video height='170' width='303' controls>
                  <source src={video.videoUrl} />
                </video>
                {video.title}
              </Link>
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default MainVideoIndex;
