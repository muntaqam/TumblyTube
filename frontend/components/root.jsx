import React, { createContext, useState } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./App";

export const SidebarContext = createContext(null);

const Root = ({ store }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleExpanded = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <Provider store={store}>
      <HashRouter>
        <SidebarContext.Provider value={{ sidebarExpanded, toggleExpanded }}>
          <App />
        </SidebarContext.Provider>
      </HashRouter>
    </Provider>
  );
};

export default Root;
