import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import CommentIdx from "./comment_idx";
import {
  deleteComment,
  fetchComments,
  fetchMoreComments,
} from "../../actions/comment_actions";

const mSTP = ({ session, entities }) => {
  return {
    comments: Object.values(entities.comments),
    currentUser: entities.users[session.id],
  };
};

const mDTP = (dispatch) => {
  return {
    fetchComments: (videoId) => dispatch(fetchComments(videoId)),
    fetchMoreComments: (videoId, numOffset, numLimit) =>
      dispatch(fetchMoreComments(videoId, numOffset, numLimit)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  };
};

export default withRouter(connect(mSTP, mDTP)(CommentIdx));
