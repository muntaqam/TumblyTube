import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createComment, editComment } from "../../../actions/comment_actions";
import CommentForm from "./comment_form";

const mSTP = ({ session, entities: { users } }, ownProps) => {
  return {
    currentUser: users[session.id],
    currentUserId: session.id,
  };
};

const mDTP = (dispatch) => {
  return {
    createComment: (comment) => dispatch(createComment(comment)),
    editComment: (commentId, comment) =>
      dispatch(editComment(commentId, comment)),
  };
};

export default withRouter(connect(mSTP, mDTP)(CommentForm));
