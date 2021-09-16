import React, { useRef } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./App";
import NotiPortal from "./noti_portal/noti_portal";
import { NotiContext } from "../context/noti_context";

// export const NotiContext = createContext(null);

const Root = ({ store }) => {
  const notiRef = useRef(null);

  const addNoti = ({ mode, message }) => {
    notiRef.current.addMessage({ mode, message });
  };

  return (
    <>
      <Provider store={store}>
        <HashRouter>
          <NotiContext.Provider value={{ addNoti }}>
            <App />
          </NotiContext.Provider>
        </HashRouter>
      </Provider>
      <NotiPortal ref={notiRef} autoClose={true} />
    </>
  );
};

export default Root;
