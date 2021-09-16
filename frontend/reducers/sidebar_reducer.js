import { EXPAND_SIDEBAR, SHRINK_SIDEBAR } from "../actions/sidebar_actions";

export default function sidebarReducer(state = "shrunk", action) {
  switch (action.type) {
    case EXPAND_SIDEBAR:
      return action.sidebar;
    case SHRINK_SIDEBAR:
      return action.sidebar;
    default:
      return state;
  }
}
