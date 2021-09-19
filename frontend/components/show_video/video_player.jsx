import React from "react";
import Tooltip from "../tooltip/tooltip";
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
      videoSupported: false,
      paused: false,
      muted: false,
      ended: false,
      duration: "0:00",
      currentTime: "0:00",
      volume: 30,
      mountedRange: false,
    };

    this.videoRef = React.createRef();
    this.volRef = React.createRef();
    this.progressBarRef = React.createRef();
    this.progressRef = React.createRef();
    this.seekTooltipRef = React.createRef();

    this.initializeVideo = this.initializeVideo.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.updateCurrentTime = this.updateCurrentTime.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.updateSeekTooltip = this.updateSeekTooltip.bind(this);
    this.handleScrub = this.handleScrub.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  // if the browser supports HTML5 video, hide default video controls and show custom controls
  componentDidMount() {
    const isVideoSupported = !!document.createElement("video").canPlayType;
    if (isVideoSupported) {
      this.videoRef.current.controls = false;
      this.setState({ videoSupported: true });
    }
  }

  togglePlay() {
    const vid = this.videoRef.current;
    if (vid.paused) {
      vid.play();
      this.setState({ paused: false, ended: false });
    } else {
      vid.pause();
      this.setState({ paused: true, ended: false });
    }
  }

  toggleMute() {
    const vol = this.state.volume;
    const halfVol = 0.5;

    if (vol == 0) {
      this.videoRef.current.volume = halfVol; // videoRef value = [0,1]
      this.handleVolume(halfVol * 100); // RangeInput value = [0, 100]
      this.setState({ muted: false });
    }
    if (vol > 0) {
      this.videoRef.current.volume = 0;
      this.handleVolume(0);
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

  // takes time length in seconds and returns the time in minutes and seconds
  formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
  }

  handleProgress() {
    const vid = this.videoRef.current;
    const percent = (vid.currentTime / vid.duration) * 100;
    this.progressBarRef.current.style.flexBasis = `${percent}%`;
  }

  initializeVideo() {
    const vid = this.videoRef.current;
    const duration = Math.floor(vid.duration);
    const time = this.formatTime(duration);

    this.setState({
      duration: `${time.minutes}:${time.seconds}`,
    });

    this.handleProgress();
  }

  updateCurrentTime() {
    const vid = this.videoRef.current;
    const time = this.formatTime(vid.currentTime);

    this.setState({
      currentTime: `${time.minutes}:${time.seconds}`,
    });

    this.handleProgress();
  }

  // find position of mouse on the progress bar and sets the tooltip position
  updateSeekTooltip(e) {
    const vid = this.videoRef.current;
    const seekTooltip = this.seekTooltipRef.current;
    const progress = this.progressRef.current;
    const seekTo =
      (e.nativeEvent.offsetX / progress.offsetWidth) * vid.duration;
    const time = this.formatTime(seekTo);

    seekTooltip.textContent = `${time.minutes}:${time.seconds}`;
    const rect = vid.getBoundingClientRect();
    seekTooltip.style.left = `${e.nativeEvent.pageX - rect.left - 25}px`;
  }

  handleScrub(e) {
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
    let playTitle = "Pause";
    if (this.state.ended) {
      playTitle = "Replay";
      playPauseReplay = replayIcon;
    }
    if (this.state.paused) {
      playTitle = "Play";
      playPauseReplay = playIcon;
    }

    return (
      <div className='player'>
        <video
          ref={this.videoRef}
          className='player__video viewer'
          src={this.props.video.videoUrl}
          preload='metadata'
          onLoadedMetadata={this.initializeVideo}
          onTimeUpdate={this.updateCurrentTime}
          onClick={this.togglePlay}
          onDoubleClick={this.toggleFullScreen}
          onEnded={this.handleEnded}
          autoPlay={true}
        ></video>
        <div
          ref={this.videoControlsRef}
          className={`player__controls player__controls--${
            this.state.paused ? "" : "hidden"
          } ${!this.state.videoSupported && "hidden"}`}
        >
          <div
            className='progress'
            ref={this.progressRef}
            onClick={this.handleScrub}
            onMouseMove={this.updateSeekTooltip}
          >
            <div ref={this.progressBarRef} className='progress__filled'></div>
            <div ref={this.seekTooltipRef} className='progress__seekTooltip'>
              00:00
            </div>
          </div>

          <Tooltip content={playTitle} position='top'>
            <button
              className='player__button toggle'
              title='Play (k)'
              onClick={this.togglePlay}
            >
              {playPauseReplay}
            </button>
          </Tooltip>

          <div
            className='player__volume'
            onMouseEnter={() => this.setState({ mountedRange: true })}
            onMouseLeave={() => this.setState({ mountedRange: false })}
          >
            <Tooltip
              content={this.state.muted ? "Unmute" : "Mute"}
              position='top'
            >
              <button
                title='Mute (m)'
                className='player__button player__button--mute toggle'
                onClick={this.toggleMute}
              >
                {this.state.muted ? volumeOffIcon : volumeUpIcon}
              </button>
            </Tooltip>

            {this.state.mountedRange && (
              <RangeInput
                onChange={this.handleVolume}
                defaultValue={this.state.volume}
                isMounted={this.state.mountedRange}
              />
            )}
          </div>
          <div className='player__time'>
            <time>{this.state.currentTime}</time>
            <span>/</span>
            <time>{this.state.duration}</time>
          </div>

          <Tooltip content='Full screen' position='top'>
            <button
              className='player__button player__button--fs'
              onClick={this.toggleFullScreen}
            >
              {fullScreenIcon}
            </button>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
