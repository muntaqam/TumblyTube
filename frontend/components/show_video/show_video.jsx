import React from "react";
import NavBar from "../main_page/nav_bar/nav_bar_container";

class VideoShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchVideo(this.props.videoId);
  }

  render() {
    if (!this.props.video) return null;
    return (
      <div>
        <div className='main__top'>
          <NavBar />
        </div>
        <video controls>
          <source src={this.props.video.videoUrl} />
        </video>
        <h2>{this.props.video.title}</h2>
        <span>{this.props.video.description}</span>
      </div>
    );
  }
}

export default VideoShow;
