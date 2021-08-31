import {
  ADD_VIDEO_VIEWS,
  RECEIVE_VIDEOS,
  RECEIVE_VIDEO,
  REMOVE_VIDEO,
} from "../actions/videos_actions";
import { RECEIVE_VIDEO_LIKE, REMOVE_VIDEO_LIKE } from "../actions/like_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_VIDEOS:
      return action.videos;

    case RECEIVE_VIDEO:
      return Object.assign({}, newState, { [action.video.id]: action.video });

    case ADD_VIDEO_VIEWS:
      newState[action.videoId]["views"]++;
      return newState;

    case REMOVE_VIDEO:
      delete newState[action.videoId];
      return newState;

    case RECEIVE_VIDEO_LIKE:
      if (action.version == "like") newState[action.videoId]["numLikes"]++;
      if (action.version == "dislike")
        newState[action.videoId]["numDislikes"]++;
      return newState;

    case REMOVE_VIDEO_LIKE:
      if (action.version == "like") newState[action.videoId]["numLikes"]--;
      if (action.version == "dislike")
        newState[action.videoId]["numDislikes"]--;
      return newState;

    default:
      return newState;
  }
};
