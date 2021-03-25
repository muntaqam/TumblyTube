import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  RECEIVE_NAME_EMAIL,
} from "../actions/session_actions";

const _nullUser = Object.freeze({
  id: null,
});

export default (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { id: action.currentUser.id };
    case RECEIVE_NAME_EMAIL:
      return { identifiedUser: action.user };
    case LOGOUT_CURRENT_USER:
      return _nullUser;
    default:
      return state;
  }
};
