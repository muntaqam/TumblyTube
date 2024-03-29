import { connect } from "react-redux";
import SubscribeButton from "./subscribe_btn";
import { subscribe, unsubscribe } from "../../actions/subscription_actions";
import { openModal } from "../../actions/modal_actions";

const mSTP = ({ entities: { users }, session }) => {
  return {
    currentUserId: session.id,
    currentUser: users[session.id],
  };
};

const mDTP = (dispatch) => {
  return {
    subscribe: (subscription) => dispatch(subscribe(subscription)),
    unsubscribe: (subscribeeId) => dispatch(unsubscribe(subscribeeId)),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(mSTP, mDTP)(SubscribeButton);
