import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createComment } from "../../actions/comment_actions";
import CommentForm from "./comment_form";

const mSTP = ({ session, entities: { users, comments } }, ownProps) => {
  return {
    currentUser: users[session.id],
    numComments: Object.keys(comments).length,
  };
};

const mDTP = (dispatch) => {
  return {
    createComment: (comment) => dispatch(createComment(comment)),
  };
};

export default withRouter(connect(mSTP, mDTP)(CommentForm));
