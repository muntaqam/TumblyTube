import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import CommentIdx from "./comment_idx";
import { fetchComments } from "../../util/comment_api_util";

const mSTP = ({ entities }, ownProps) => {
  return {
    comments: entities.comments,
    currentVideId: ownProps.match.param.id,
  };
};

const mDTP = (dispatch) => {
  return {
    fetchComments: (vidId) => dispatch(fetchComments(vidId)),
  };
};

export default withRouter(connect(mSTP, mDTP)(CommentIdx));
