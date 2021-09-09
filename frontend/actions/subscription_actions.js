import * as APIUtil from "../util/subscription_api_util";

export const RECEIVE_SUBSCRIPTION = "RECEIVE_SUBSCRIPTION";
export const REMOVE_SUBSCRIPTION = "REMOVE_SUBSCRIPTION";

const receiveSubscription = (subscription) => {
  return {
    type: RECEIVE_SUBSCRIPTION,
    subscriberId: subscription.subscriberId,
    subscribee: subscription.username.toLowerCase(),
    subscription,
  };
};

const removeSubscription = (subscription) => {
  return {
    type: REMOVE_SUBSCRIPTION,
    subscriberId: subscription.subscriberId,
    subscribee: subscription.username.toLowerCase(),
  };
};

export const subscribe = (subscription) => (dispatch) => {
  return APIUtil.subscribe(subscription).then((subscription) =>
    dispatch(receiveSubscription(subscription))
  );
};

export const unsubscribe = (subscribeeId) => (dispatch) => {
  return APIUtil.unsubscribe(subscribeeId).then((subscription) =>
    dispatch(removeSubscription(subscription))
  );
};
