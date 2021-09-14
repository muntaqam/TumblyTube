import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { closeDropdown, openDropdown } from "../../actions/dropdown_actions";
import { createLike, deleteLike } from "../../actions/like_actions";
import LikeInterface from "./like_interface";

const mSTP = ({ ui, session, entities: { users } }) => {
  return {
    dropdown: ui.dropdown,
    currentUserId: session.id,
    currentUser: users[session.id],
  };
};

const mDTP = (dispatch) => {
  return {
    createLike: (like) => dispatch(createLike(like)),
    deleteLike: (likeId) => dispatch(deleteLike(likeId)),
    openDropdown: (type) => dispatch(openDropdown(type)),
    closeDropdown: () => dispatch(closeDropdown()),
  };
};

export default connect(mSTP, mDTP)(LikeInterface);
