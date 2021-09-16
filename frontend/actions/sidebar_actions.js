export const EXPAND_SIDEBAR = "EXPAND_SIDEBAR";
export const SHRINK_SIDEBAR = "SHRINK_SIDEBAR";

export const expandSidebar = () => {
  return {
    type: EXPAND_SIDEBAR,
    sidebar: "expanded",
  };
};

export const shrinkSidebar = () => {
  return {
    type: SHRINK_SIDEBAR,
    sidebar: "shrunk",
  };
};
