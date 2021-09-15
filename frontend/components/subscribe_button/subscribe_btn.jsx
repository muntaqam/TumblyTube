import React, { useEffect, useState } from "react";
import { useHandleClickOutside } from "../../hooks/useHandleClickOutside";
import Dropdown from "../dropdown/dropdown";

export default function SubscribeButton(props) {
  const { creator, currentUser, currentUserId, subscribe, openModal } = props;
  const [subscribed, setSubscribed] = useState(false);

  const { showDropdown, triggerRef, dropdownRef } =
    useHandleClickOutside(false);

  useEffect(() => {
    if (!currentUserId) setSubscribed(false);
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
  }, [currentUserId, currentUser]);

  const handleSubscribe = () => {
    if (!currentUserId) return;

    const subscription = {
      subscriber_id: currentUserId,
      subscribee_id: creator.id,
    };

    if (subscribed) {
      openModal({
        mode: "unsubscribe",
        meta: {
          subscribeeName: creator.username,
          subscribeeId: subscription.subscribee_id,
        },
      });
    } else {
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
