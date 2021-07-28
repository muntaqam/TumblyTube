import React from "react";
import NavBar from "../main_page/nav_bar/nav_bar_container";
import {
  playIcon,
  pauseIcon,
  volumeUpIcon,
  volumeOffIcon,
  fullScreenIcon,
  fullScreenExitIcon,
} from "./video_control_icons";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      muted: false,
    };

    this.videoRef = React.createRef();
    this.volRef = React.createRef();

    this.togglePlay = this.togglePlay.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  componentDidMount() {
    this.props.fetchVideo(this.props.videoId);
  }

  togglePlay() {
    const vid = this.videoRef.current;
    if (vid.paused) {
      vid.play();
      this.setState({ paused: false });
    } else {
      vid.pause();
      this.setState({ paused: true });
    }
  }

  toggleMute() {
    const vol = this.videoRef.current.volume;
    if (vol === 0) {
      this.videoRef.current.volume = 0.5;
      this.setState({ muted: false });
    } else {
      this.videoRef.current.volume = 0;
      this.setState({ muted: true });
    }
  }

  handleVolume() {
    const rangeVal = this.volRef.current.value;
    this.videoRef.current.volume = rangeVal;

    if (rangeVal > 0) {
      this.setState({ muted: false });
    } else {
      this.setState({ muted: true });
    }
  }

  toggleFullScreen() {
    this.videoRef.current.webkitEnterFullScreen();
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
            onClick={this.togglePlay}
            onDoubleClick={this.toggleFullScreen}
            autoPlay
          ></video>
          <div className='player__controls'>
            <div className='progress'>
              <div className='progress__filled'></div>
            </div>
            <button
              className='player__button toggle'
              title={this.state.paused ? "Play" : "Pause"}
              onClick={this.togglePlay}
            >
              {this.state.paused ? playIcon : pauseIcon}
            </button>
            <button
              className='player__button toggle'
              onClick={this.toggleMute}
              title={this.state.muted ? "Unmute" : "Mute"}
            >
              {this.state.muted ? volumeOffIcon : volumeUpIcon}
            </button>
            <input
              type='range'
              name='volume'
              className='player__slider'
              ref={this.volRef}
              min='0'
              max='1'
              step='0.05'
              value='1'
              onChange={this.handleVolume}
            />
            <button data-skip='-10' className='player__button'>
              ⤺ 10s
            </button>
            <button data-skip='10' className='player__button'>
              25s ⤻
            </button>
            <button className='player__button' onClick={this.toggleFullScreen}>
              {fullScreenIcon}
            </button>
          </div>

          <h2>{this.props.video.title}</h2>
          <span>{this.props.video.description}</span>
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
