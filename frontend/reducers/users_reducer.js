import {
  LOGOUT_CURRENT_USER,
  RECEIVE_CURRENT_USER,
  RECEIVE_NAME_EMAIL,
} from "../actions/session_actions";
import {
  RECEIVE_VIDEO_LIKE,
  RECEIVE_COMMENT_LIKE,
  REMOVE_LIKE,
} from "../actions/like_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {
        [action.currentUser.id]: action.currentUser,
      });
    case LOGOUT_CURRENT_USER:
      return {};
    case RECEIVE_VIDEO_LIKE:
      newState[action.likerId]["likedVideos"][action.videoId] = action.like;
      return newState;
    case RECEIVE_COMMENT_LIKE:
      newState[action.likerId]["likedComments"][action.commentId] = action.like;
      return newState;
    case REMOVE_LIKE:
      if (action.likeableType == "Video") {
        delete newState[action.likerId]["likedVideos"][action.likeableId];
      }
      if (action.likeableType == "Comment") {
        delete newState[action.likerId]["likedComments"][action.likeableId];
      }
      return newState;
    default:
      return newState;
  }
};

export default usersReducer;
