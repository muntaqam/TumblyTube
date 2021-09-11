import React, { forwardRef, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";
import { useNotiPortal } from "../../hooks/useNotiPortal";
import { useNotiAutoClose } from "../../hooks/useNotiAutoClose";
import { uuid } from "../../util/uuid_util";
import Noti from "../noti/noti";

const NotiPortal = forwardRef(({ autoClose, autoCloseTime = 3000 }, ref) => {
  const [notis, setNotis] = useState([]); // contains message and color(mode)
  const { loaded, portalId } = useNotiPortal();

  useNotiAutoClose({ notis, setNotis, autoClose, autoCloseTime });

  const removeNoti = (id) => {
    setNotis(notis.filter((noti) => noti.id !== id));
  };

  useImperativeHandle(ref, () => ({
    // takes in message and mode; generates unique id
    addMessage(noti) {
      setNotis([...notis, { ...noti, id: uuid() }]);
    },
  }));

  return (
    loaded &&
    createPortal(
      <div className='noti'>
        {notis.map((noti) => (
          <Noti
            key={noti.id}
            mode={noti.mode}
            message={noti.message}
            onClose={() => removeNoti(noti.id)}
          />
        ))}
      </div>,

      document.getElementById(portalId)
    )
  );
});

export default NotiPortal;
