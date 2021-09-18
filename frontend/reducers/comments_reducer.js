import {
  RECEIVE_CHILD_COMMENT,
  RECEIVE_COMMENT,
  RECEIVE_COMMENTS,
  RECEIVE_MORE_COMMENTS,
  REMOVE_CHILD_COMMENT,
  REMOVE_COMMENT,
} from "../actions/comment_actions";
import {
  RECEIVE_CHILD_COMMENT_LIKE,
  RECEIVE_COMMENT_LIKE,
  REMOVE_COMMENT_LIKE,
  REMOVE_CHILD_COMMENT_LIKE,
} from "../actions/like_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.comments;

    case RECEIVE_MORE_COMMENTS:
      return Object.assign({}, newState, action.comments);

    case RECEIVE_COMMENT:
      return Object.assign({}, newState, {
        [action.comment.id]: action.comment,
      });

    case RECEIVE_CHILD_COMMENT:
      newState[action.parentCommentId].childComments[action.comment.id] =
        action.comment;
      return newState;

    case REMOVE_COMMENT:
      delete newState[action.commentId];
      return newState;

    case REMOVE_CHILD_COMMENT:
      delete newState[action.parentCommentId].childComments[action.commentId];
      return newState;

    case RECEIVE_COMMENT_LIKE:
      if (action.version == "like") newState[action.commentId]["numLikes"]++;
      if (action.version == "dislike")
        newState[action.commentId]["numDislikes"]++;
      return newState;

    case RECEIVE_CHILD_COMMENT_LIKE:
      if (action.version == "like")
        newState[action.parentCommentId].childComments[action.commentId][
          "numLikes"
        ]++;
      if (action.version == "dislike")
        newState[action.parentCommentId].childComments[action.commentId][
          "numDislikes"
        ]++;
      return newState;

    case REMOVE_COMMENT_LIKE:
      if (action.version == "like") newState[action.commentId]["numLikes"]--;
      if (action.version == "dislike")
        newState[action.commentId]["numDislikes"]--;
      return newState;

    case REMOVE_CHILD_COMMENT_LIKE:
      if (action.version == "like")
        newState[action.parentCommentId].childComments[action.commentId][
          "numLikes"
        ]--;
      if (action.version == "dislike")
        newState[action.parentCommentId].childComments[action.commentId][
          "numDislikes"
        ]--;
      return newState;

    default:
      return newState;
  }
};
