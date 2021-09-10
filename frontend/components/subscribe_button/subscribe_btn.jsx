import React, { useEffect, useState } from "react";

export default function SubscribeButton(props) {
  const { creator, currentUser, currentUserId, subscribe, unsubscribe } = props;
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (
      currentUserId &&
      currentUser.subscribees[creator.username.toLowerCase()]
    ) {
      setSubscribed(true);
    }
    if (
      currentUserId &&
      !currentUser.subscribees[creator.username.toLowerCase()]
    ) {
      setSubscribed(false);
    }
  }, []);

  const handleSubscribe = () => {
    const subscription = {
      subscriber_id: currentUserId,
      subscribee_id: creator.id,
    };

    if (subscribed) {
      setSubscribed(false);
      unsubscribe(subscription.subscribee_id);
    } else {
      setSubscribed(true);
      subscribe(subscription);
    }
  };

  return (
    <>
      <button
        className={subscribed ? "subscribe subscribe__inactive" : "subscribe"}
        onClick={handleSubscribe}
      >
        {subscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
      </button>
    </>
  );
}
