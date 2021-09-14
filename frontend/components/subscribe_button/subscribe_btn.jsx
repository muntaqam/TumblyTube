import React, { useEffect, useState } from "react";
import { useHandleClickOutside } from "../../hooks/useHandleClickOutside";
import Dropdown from "../dropdown/dropdown";

export default function SubscribeButton(props) {
  const { creator, currentUser, currentUserId, subscribe, unsubscribe } = props;
  const [subscribed, setSubscribed] = useState(false);

  const { showDropdown, triggerRef, dropdownRef } =
    useHandleClickOutside(false);

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
    if (!currentUserId) return;

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
    <div style={{ position: "relative" }}>
      <button
        ref={triggerRef}
        className={subscribed ? "subscribe subscribe__inactive" : "subscribe"}
        onClick={handleSubscribe}
      >
        {subscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
      </button>
      {!currentUserId && showDropdown && (
        <Dropdown ref={dropdownRef} mode='subscribe' />
      )}
    </div>
  );
}
