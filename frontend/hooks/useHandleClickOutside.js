import { useEffect } from "react";

export const useHandleClickOutside = ({
  dropDownRef,
  showDropDown,
  setShowDropDown,
}) => {
  const handleClickOutside = (e) => {
    if (dropDownRef.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setShowDropDown(false);
  };

  useEffect(() => {
    if (showDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropDown]);
};
