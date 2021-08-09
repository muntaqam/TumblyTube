import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import CommentIdx from "./comment_idx";
import { fetchComments, deleteComment } from "../../util/comment_api_util";

const mSTP = ({ entities }, ownProps) => {
  return {
    comments: Object.values(entities.comments),
    currentVideoId: ownProps.match.params.id,
  };
};

const mDTP = (dispatch) => {
  return {
    fetchComments: (vidId) => dispatch(fetchComments(vidId)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  };
};

export default withRouter(connect(mSTP, mDTP)(CommentIdx));
