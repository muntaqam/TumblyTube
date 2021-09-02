import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import VideoShow from "./show_video";
import { addViews, fetchVideos } from "../../actions/videos_actions";
import { fetchComments } from "../../actions/comment_actions";

const mSTP = ({ entities }, ownProps) => {
  return {
    videos: Object.values(entities.videos),
    currentVideo: entities.videos[ownProps.match.params.id],
    currentVideoId: ownProps.match.params.id,
  };
};

const mDTP = (dispatch) => {
  return {
    addViews: (vidId) => dispatch(addViews(vidId)),
    fetchVideos: (addViewId) => dispatch(fetchVideos(addViewId)),
    fetchComments: (vidId, numLimit) =>
      dispatch(fetchComments(vidId, numLimit)),
  };
};

export default withRouter(connect(mSTP, mDTP)(VideoShow));
