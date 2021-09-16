import { useState, useEffect } from "react";
import { useListenViewport } from "./useListenViewport";

export const useHandleDropdownPosition = ({ triggerRef, currentUserId }) => {
  // hook that listens to viewport size changes
  const { viewportWidth, viewportHeight } = useListenViewport();

  const [rightAvailable, setRightAvailable] = useState(true);
  const [bottomAvailabe, setBottomAvailable] = useState(true);

  // returned variables
  // top is always default
  const [rightPosition, setRightPosition] = useState(null);
  const [bottomPosition, setBottomPosition] = useState(null);
  const [leftPosition, setLeftPosition] = useState(null);

  const handleDropdownPosition = () => {
    // get the height of triggerRef for dropdown's accurate Bottom positioning
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
    if (!currentUserId && triggerRef.current) handleDropdownPosition();
  }, [currentUserId, triggerRef.current, rightAvailable, bottomAvailabe]);

  const updateAvailableSpace = () => {
    // dropdown's dimensions
    const dropdownWidth = 378;
    const dropdownHeight = 175;

    // empty space between right window broder and triggerRef's right position
    let right =
      viewportWidth - triggerRef.current.getBoundingClientRect().right;

    // empty space between bottom window broder and triggerRef's bottom position
    let bottom =
      viewportHeight - triggerRef.current.getBoundingClientRect().bottom;

    // if empty space is smaller than dropdown, set false : true
    right < dropdownWidth 
      ? setRightAvailable(false) 
      : setRightAvailable(true);

    bottom < dropdownHeight
      ? setBottomAvailable(false)
      : setBottomAvailable(true);
  };

  useEffect(() => {
    if (!currentUserId && triggerRef.current) updateAvailableSpace();
  }, [currentUserId, triggerRef.current, viewportWidth, viewportHeight]);

  useEffect(() => {
    if (!currentUserId && triggerRef.current) {
      // listens to scroll for when dropdown touches the top window while position on top
      // position dropdown on bottom of triggerRef, if it's touching the top window
      window.addEventListener("scroll", updateAvailableSpace);
    } else {
      window.removeEventListener("scroll", updateAvailableSpace);
    }

    return () => window.removeEventListener("scroll", updateAvailableSpace);
  }, [currentUserId, triggerRef.current]);

  return { rightPosition, bottomPosition, leftPosition };
};
