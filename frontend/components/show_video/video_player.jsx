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
      duration: "0:00",
      currentTime: "0:00",
    };

    this.videoRef = React.createRef();
    this.volRef = React.createRef();
    this.progressBarRef = React.createRef();
    this.progressRef = React.createRef();

    this.togglePlay = this.togglePlay.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.setTime = this.setTime.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleScrub = this.handleScrub.bind(this);
    // this.handleSeek = this.handleSeek.bind(this);
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
    this.videoRef.current.requestFullscreen();
  }

  setTime() {
    this.handleProgress();

    const vid = this.videoRef.current;
    let durationMin = Math.floor(vid.duration / 60);
    let durationSec = Math.floor(vid.duration - durationMin * 60);
    let currentMin = Math.floor(vid.currentTime / 60);
    let currentSec = Math.floor(vid.currentTime - currentMin * 60);
    if (durationSec < 10) {
      durationSec = `0${durationSec}`;
    }
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }
    this.setState({
      duration: `${durationMin}:${durationSec}`,
      currentTime: `${currentMin}:${currentSec}`,
    });
  }

  handleProgress() {
    const vid = this.videoRef.current;
    const percent = (vid.currentTime / vid.duration) * 100;
    this.progressBarRef.current.style.flexBasis = `${percent}%`;
  }

  handleScrub(e) {
    e.preventDefault();
    const vid = this.videoRef.current;
    const progress = this.progressRef.current;
    const scrubTime =
      (e.nativeEvent.offsetX / progress.offsetWidth) * vid.duration;
    vid.currentTime = scrubTime;
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
            onTimeUpdate={this.setTime}
            autoPlay
          ></video>
          <div className='player__controls'>
            <div
              className='progress'
              ref={this.progressRef}
              onClick={this.handleScrub}
            >
              <div className='progress__filled' ref={this.progressBarRef}></div>
            </div>
            <button
              className='player__button toggle'
              title={this.state.paused ? "Play" : "Pause"}
              onClick={this.togglePlay}
            >
              {this.state.paused ? playIcon : pauseIcon}
            </button>
            <button
              className='player__button player__button-mute toggle'
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
              onChange={this.handleVolume}
            />
            <div className='player__time'>
              <span>{this.state.currentTime}</span>
              <span>/</span>
              <span>{this.state.duration}</span>
            </div>
            <button
              className='player__button player__button-fs'
              onClick={this.toggleFullScreen}
            >
              {fullScreenIcon}
            </button>
          </div>
        </div>
        <h2>{this.props.video.title}</h2>
        <span>{this.props.video.description}</span>
      </div>
    );
  }
}

export default VideoPlayer;
