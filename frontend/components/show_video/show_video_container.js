import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import VideoPlayer from "./video_player";
import { fetchVideo } from "../../actions/videos_actions";

const mSTP = (state, ownProps) => {
  return {
    video: state.entities.videos[ownProps.match.params.id],
    videoId: ownProps.match.params.id,
  };
};

const mDTP = (dispatch) => {
  return {
    fetchVideo: (videoId) => dispatch(fetchVideo(videoId)),
  };
};

export default withRouter(connect(mSTP, mDTP)(VideoPlayer));
