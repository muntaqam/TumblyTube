import { OPEN_DROPDOWN, CLOSE_DROPDOWN } from "../actions/dropdown_actions";

export default function dropDownReducer(state = null, action) {
  switch (action.type) {
    case OPEN_DROPDOWN:
      return action.dropdown;
    case CLOSE_DROPDOWN:
      return null;
    default:
      return state;
  }
}
