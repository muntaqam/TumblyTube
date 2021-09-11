import { useEffect, useState } from "react";

export const useNotiAutoClose = ({
  notis,
  setNotis,
  autoClose,
  autoCloseTime,
}) => {
  const [removingId, setRemovingId] = useState("");

  useEffect(() => {
    if (removingId)
      setNotis((noti) => noti.filter((_noti) => _noti.id !== removingId));
  }, [removingId, setNotis]);

  useEffect(() => {
    if (autoClose && notis.length) {
      const id = notis[notis.length - 1].id;
      setTimeout(() => setRemovingId(id), autoCloseTime);
    }
  }, [notis, autoCloseTime, autoClose]);
};
