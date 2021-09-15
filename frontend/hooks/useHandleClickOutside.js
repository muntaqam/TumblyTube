import { useEffect, useState, useRef } from "react";

export const useHandleClickOutside = (initState) => {
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(initState);

  const handleClickOutside = (e) => {
    if (triggerRef.current && triggerRef.current.contains(e.target)) {
      // toggle for triggerRef
      return setShowDropdown(!showDropdown);
    }

    // close dropdown when it's rendered and clicked outside
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      return setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { showDropdown, triggerRef, dropdownRef };
};
