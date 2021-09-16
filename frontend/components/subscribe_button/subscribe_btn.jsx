import React, { useEffect, useState, useRef, useContext } from "react";
import { useHandleClickOutside } from "../../hooks/useHandleClickOutside";
import { useHandleDropdownPosition } from "../../hooks/useHandleDropdownPosition";
import Dropdown from "../dropdown/dropdown";
import { NotiContext } from "../../context/noti_context";

export default function SubscribeButton(props) {
  const { creator, currentUser, currentUserId, subscribe, openModal } = props;
  const [subscribed, setSubscribed] = useState(false);
  const { addNoti } = useContext(NotiContext);

  const { showDropdown, triggerRef, dropdownRef } =
    useHandleClickOutside(false);

  const { rightPosition, bottomPosition, leftPosition } =
    useHandleDropdownPosition({ triggerRef, currentUserId });

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
    if (!currentUserId) {
      return addNoti({
        mode: "fail",
        message: `Must sign-in to subscribe to ${creator.username}`,
      });
    }

    const subscription = {
      subscriber_id: currentUserId,
      subscribee_id: creator.id,
    };

    if (subscribed) {
      openModal({
        mode: "unsubscribe",
        meta: {
          subscribeeName: creator.username,
          subscribeeId: creator.id,
        },
      });
    } else {
      subscribe(subscription);
      addNoti({
        mode: "success",
        message: `${creator.username} added to subscriptions`,
      });
    }
  };

  return (
    <div style={{ position: "relative", alignSelf: "center" }}>
      <button
        ref={triggerRef}
        className={subscribed ? "subscribe subscribe__inactive" : "subscribe"}
        onClick={handleSubscribe}
      >
        {subscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
      </button>

      {!currentUserId && showDropdown && (
        <Dropdown
          ref={dropdownRef}
          mode='subscribe'
          right={rightPosition}
          bottom={bottomPosition}
          left={leftPosition}
        />
      )}
    </div>
  );
}
