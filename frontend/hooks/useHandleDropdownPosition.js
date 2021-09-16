import { useState, useEffect } from "react";
import { useListenViewport } from "./useListenViewport";

export const useHandleDropdownPosition = ({ triggerRef, currentUserId }) => {
  if (currentUserId) return;

  const { viewportWidth, viewportHeight } = useListenViewport();

  const [rightAvailable, setRightAvailable] = useState(true);
  const [bottomAvailabe, setBottomAvailable] = useState(true);

  // returned variables
  // top is always default
  const [rightPosition, setRightPosition] = useState(null);
  const [bottomPosition, setBottomPosition] = useState(null);
  const [leftPosition, setLeftPosition] = useState(null);

  const handleDropdownPosition = () => {
    const triggerRefHeight = triggerRef.current.getBoundingClientRect().height;
    const heightMargin = 3;

    if (rightAvailable) {
      setLeftPosition(0);
      setRightPosition(null);
    } else {
      setRightPosition(0);
      setLeftPosition(null);
    }

    if (bottomAvailabe) {
      setBottomPosition(null);
    } else {
      setBottomPosition(triggerRefHeight + heightMargin);
    }
  };

  useEffect(() => {
    handleDropdownPosition();
  }, [rightAvailable, bottomAvailabe]);

  const updateAvailableSpace = () => {
    const dropdownWidth = 378;
    const dropdownHeight = 175;

    let right =
      viewportWidth - triggerRef.current.getBoundingClientRect().right;
    let bottom =
      viewportHeight - triggerRef.current.getBoundingClientRect().bottom;

    right < dropdownWidth ? setRightAvailable(false) : setRightAvailable(true);

    bottom < dropdownHeight
      ? setBottomAvailable(false)
      : setBottomAvailable(true);
  };

  useEffect(() => {
    updateAvailableSpace();
  }, [viewportWidth, viewportHeight]);

  useEffect(() => {
    if (triggerRef.current) {
      window.addEventListener("scroll", updateAvailableSpace);
    } else {
      window.removeEventListener("scroll", updateAvailableSpace);
    }

    return () => window.removeEventListener("scroll", updateAvailableSpace);
  }, [triggerRef.current]);

  return { rightPosition, bottomPosition, leftPosition };
};
