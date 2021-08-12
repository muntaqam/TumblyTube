import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import CommentIdx from "./comment_idx";
import { deleteComment } from "../../actions/comment_actions";

const mSTP = ({ session, entities }, ownProps) => {
  return {
    comments: Object.values(entities.comments),
    currentUser: entities.users[session.id],
    currentVideoId: ownProps.match.params.id,
  };
};

const mDTP = (dispatch) => {
  return {
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  };
};

export default withRouter(connect(mSTP, mDTP)(CommentIdx));
