import {
  LOGOUT_CURRENT_USER,
  RECEIVE_CURRENT_USER,
  RECEIVE_USERS,
} from "../actions/session_actions";
import {
  RECEIVE_VIDEO_LIKE,
  RECEIVE_COMMENT_LIKE,
  RECEIVE_CHILD_COMMENT_LIKE,
  REMOVE_VIDEO_LIKE,
  REMOVE_CHILD_COMMENT_LIKE,
  REMOVE_COMMENT_LIKE,
} from "../actions/like_actions";
import {
  RECEIVE_SUBSCRIPTION,
  REMOVE_SUBSCRIPTION,
} from "../actions/subscription_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, newState, {
        [action.currentUser.id]: action.currentUser,
      });

    case RECEIVE_USERS:
      Object.values(action.users).map((user) => {
        if (!newState.hasOwnProperty(user.id)) newState[user.id] = user;
      });
      return newState;

    case LOGOUT_CURRENT_USER:
      return {};

    case RECEIVE_VIDEO_LIKE:
      newState[action.likerId]["likedVideos"][action.videoId] = action.like;
      return newState;

    case REMOVE_VIDEO_LIKE:
      delete newState[action.likerId]["likedVideos"][action.videoId];
      return newState;

    case RECEIVE_COMMENT_LIKE:
    case RECEIVE_CHILD_COMMENT_LIKE:
      newState[action.likerId]["likedComments"][action.commentId] = action.like;
      return newState;

    case REMOVE_COMMENT_LIKE:
    case REMOVE_CHILD_COMMENT_LIKE:
      delete newState[action.likerId]["likedComments"][action.commentId];
      return newState;

    case RECEIVE_SUBSCRIPTION:
      return {
        ...state,
        [action.subscriberId]: {
          ...state[action.subscriberId],
          ["subscribees"]: {
            ...state[action.subscriberId]["subscribees"],
            [action.subscribee]: action.subscription,
          },
        },
      };

    case REMOVE_SUBSCRIPTION:
      const dupSubscribees = { ...newState[action.subscriberId].subscribees };
      delete dupSubscribees[action.subscribee];

      return {
        ...state,
        [action.subscriberId]: {
          ...state[action.subscriberId],
          ["subscribees"]: {
            ...dupSubscribees,
          },
        },
      };

    default:
      return newState;
  }
};

export default usersReducer;
