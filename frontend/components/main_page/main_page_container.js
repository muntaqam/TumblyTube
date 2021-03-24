import { connect } from "react-redux";
import { logout, login } from "../../actions/session_actions";
import MainPage from "./main_page";

const mSTP = ({ session, entities: { users } }) => {
  return {
    currentUser: users[session.id],
  };
};

const mDTP = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    login: () => dispatch(login()),
  };
};

export default connect(mSTP, mDTP)(MainPage);
