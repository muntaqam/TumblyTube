import { connect } from "react-redux";
import SubscribeButton from "./subscribe_btn";
import { subscribe, unsubscribe } from "../../actions/subscription_actions";

const mSTP = ({ entities: { users }, session }) => {
  return {
    currentUserId: session.id,
    currentUserSubscribees: users[session.id].subscribees,
  };
};

const mDTP = (dispatch) => {
  return {
    subscribe: (subscription) => dispatch(subscribe(subscription)),
    unsubscribe: (subscribeeId) => dispatch(unsubscribe(subscribeeId)),
  };
};

export default connect(mSTP, mDTP)(SubscribeButton);
