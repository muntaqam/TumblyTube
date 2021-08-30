import React from "react";
import {
  playIcon,
  pauseIcon,
  replayIcon,
  volumeUpIcon,
  volumeOffIcon,
  fullScreenIcon,
} from "./video_control_icons";
import RangeInput from "./video_control_range";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      muted: false,
      ended: false,
      duration: "0:00",
      currentTime: "0:00",
      volume: 50,
    };

    this.videoRef = React.createRef();
    this.volRef = React.createRef();
    this.progressBarRef = React.createRef();
    this.progressRef = React.createRef();

    this.togglePlay = this.togglePlay.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.setTime = this.setTime.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleScrub = this.handleScrub.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
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

    if (this.state.ended) {
      this.setState({ ended: false });
    }
  }

  toggleMute() {
    const vol = this.videoRef.current.volume;
    const halfVol = 0.5;
    const zeroVol = 0;

    if (vol == 0) {
      this.videoRef.current.volume = halfVol;
      this.handleVolume(halfVol * 100);
      this.setState({ muted: false });
    }
    if (vol > 0) {
      this.videoRef.current.volume = zeroVol;
      this.handleVolume(zeroVol);
      this.setState({ muted: true });
    }
  }

  handleVolume(volume) {
    this.setState({ volume: volume });
    this.videoRef.current.volume = volume / 100;

    if (volume > 0) {
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

  handleEnded() {
    this.setState({ ended: true });
  }

  render() {
    let playPauseReplay = pauseIcon;
    if (this.state.ended) playPauseReplay = replayIcon;
    if (this.state.paused) playPauseReplay = playIcon;

    return (
      <div className='player'>
        <video
          className='player__video viewer'
          src={this.props.video.videoUrl}
          ref={this.videoRef}
          onClick={this.togglePlay}
          onDoubleClick={this.toggleFullScreen}
          onTimeUpdate={this.setTime}
          onEnded={this.handleEnded}
          // autoPlay
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
            {playPauseReplay}
          </button>
          <button
            className='player__button player__button--mute toggle'
            onClick={this.toggleMute}
            title={this.state.muted ? "Unmute" : "Mute"}
          >
            {this.state.muted ? volumeOffIcon : volumeUpIcon}
          </button>
          <RangeInput
            onChange={this.handleVolume}
            defaultValue={this.state.volume}
          />
          <div className='player__time'>
            <span>{this.state.currentTime}</span>
            <span>/</span>
            <span>{this.state.duration}</span>
          </div>
          <button
            className='player__button player__button--fs'
            onClick={this.toggleFullScreen}
          >
            {fullScreenIcon}
          </button>
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
