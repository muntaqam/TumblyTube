import * as APIUtil from "../util/comment_api_util";

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_CHILD_COMMENT = "RECEIVE_CHILD_COMMENT";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments,
});

const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment,
});

const receiveChildComment = (comment) => ({
  type: RECEIVE_CHILD_COMMENT,
  comment,
  parentCommentId: comment.parentCommentId,
});

const removeComment = (comment) => ({
  type: REMOVE_COMMENT,
  commentId: comment.id,
  parentCommentId: comment.parentCommentId,
});

export const fetchComments = (vidId) => (dispatch) => {
  return APIUtil.fetchComments(vidId).then((comments) =>
    dispatch(receiveComments(comments))
  );
};

export const createComment = (comment) => (dispatch) => {
  return APIUtil.createComment(comment).then((comment) =>
    comment.parentCommentId
      ? dispatch(receiveChildComment(comment))
      : dispatch(receiveComment(comment))
  );
};

export const deleteComment = (commentId) => (dispatch) => {
  return APIUtil.deleteComment(commentId).then((comment) =>
    dispatch(removeComment(comment))
  );
};
