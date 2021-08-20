import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import VideoShow from "./show_video";
import { fetchVideos } from "../../actions/videos_actions";
import { fetchComments } from "../../actions/comment_actions";

const mSTP = ({ entities }, ownProps) => {
  return {
    videos: entities.videos,
    currentVideo: entities.videos[ownProps.match.params.id],
    currentVideoId: ownProps.match.params.id,
  };
};

const mDTP = (dispatch) => {
  return {
    fetchVideos: () => dispatch(fetchVideos()),
    fetchComments: (vidId) => dispatch(fetchComments(vidId)),
  };
};

export default withRouter(connect(mSTP, mDTP)(VideoShow));
