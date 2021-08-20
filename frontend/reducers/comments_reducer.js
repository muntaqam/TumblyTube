import {
  RECEIVE_COMMENT,
  RECEIVE_COMMENTS,
  REMOVE_COMMENT,
} from "../actions/comment_actions";
import { RECEIVE_COMMENT_LIKE, REMOVE_LIKE } from "../actions/like_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.comments;
    case RECEIVE_COMMENT:
      return Object.assign({}, state, { [action.comment.id]: action.comment });
    case REMOVE_COMMENT:
      delete newState[action.commentId];
      return newState;
    case RECEIVE_COMMENT_LIKE:
      if (action.version == "like") 
        newState[action.commentId]["numLikes"]++;
      if (action.version == "dislike")
        newState[action.commentId]["numDislikes"]++;
      return newState;
    case REMOVE_LIKE:
      if (action.likeableType == "Comment") {
        if (action.version == "like") 
          newState[action.likeableId]["numLikes"]--;
        if (action.version == "dislike")
          newState[action.likeableId]["numDislikes"]--;
      }
      return newState;
    default:
      return newState;
  }
};
