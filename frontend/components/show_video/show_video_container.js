import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import VideoShow from "./show_video";
import { fetchVideo } from "../../actions/videos_actions";

const mSTP = (state, ownProps) => {
  return {
    videoId: ownProps.match.params.video_id,
    video: state.entities.videos[ownProps.match.params.video_id],
  };
};

const mDTP = (dispatch) => {
  return {
    fetchVideo: (videoId) => dispatch(fetchVideo(videoId)),
  };
};

export default withRouter(connect(mSTP, mDTP)(VideoShow));
