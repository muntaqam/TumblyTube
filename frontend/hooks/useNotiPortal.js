import { useEffect, useState } from "react";
import { uuid } from "../util/uuid_util";

export const useNotiPortal = () => {
  const [loaded, setLoaded] = useState(false);
  const [portalId] = useState(`noti-portal-${uuid()}`);

  useEffect(() => {
    const div = document.createElement("div");
    div.id = portalId;
    div.style = "position: fixed; bottom: 20px; left: 30px; z-index: 9999";
    document.getElementsByTagName("body")[0].prepend(div);
    setLoaded(true);

    return () => document.getElementsByTagName("body")[0].removeChild(div);
  }, [portalId]);

  return { loaded, portalId };
};
