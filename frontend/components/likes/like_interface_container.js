import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { closeDropdown, openDropdown } from "../../actions/dropdown_actions";
import { createLike, deleteLike } from "../../actions/like_actions";
import LikeInterface from "./like_interface";

const mSTP = ({ session, entities: { users }, ui }) => {
  return {
    currentUser: users[session.id],
    currentUserId: session.id,
    dropdown: ui.dropdown,
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

export default withRouter(connect(mSTP, mDTP)(LikeInterface));
