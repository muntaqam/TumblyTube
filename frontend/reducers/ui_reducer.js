import { combineReducers } from "redux";
import dropDownReducer from "./dropDown_reducer";
import modalReducer from "./modal_reducer";

const uiReducer = combineReducers({
  modal: modalReducer,
  dropdown: dropDownReducer,
});

export default uiReducer;
