import React from "react";
import NavBar from "../main_page/nav_bar/nav_bar_container";

class VideoShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    const method = this.videoRef.current.paused ? "play" : "pause";
    this.videoRef.current[method]();
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
        <div className='player'>
          <video
            className='player__video viewer'
            src={this.props.video.videoUrl}
            ref={this.videoRef}
          ></video>
          <div className='player__controls'>
            <div className='progress'>
              <div className='progress__filled'></div>
            </div>
            <button
              className='player__button toggle'
              title='Toggle Play'
              onClick={this.togglePlay}
            >
              ➤
            </button>
            <input
              type='range'
              name='volume'
              className='player__slider'
              min='0'
              max='1'
              step='0.05'
              value='1'
            />
            <button data-skip='-10' className='player__button'>
              ⤺ 10s
            </button>
            <button data-skip='25' className='player__button'>
              25s ⤻
            </button>
          </div>

          <h2>{this.props.video.title}</h2>
          <span>{this.props.video.description}</span>
        </div>
      </div>
    );
  }
}

export default VideoShow;
