import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import SessionButton from "./session_button";

const mSTP = ({ session, entities: { users } }) => {
  return {
    currentUser: users[session.id],
  };
};

const mDTP = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mSTP, mDTP)(SessionButton);
