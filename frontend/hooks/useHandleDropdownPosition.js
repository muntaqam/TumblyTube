import { useState, useEffect } from "react";
import { useListenViewport } from "./useListenViewport";

export const useHandleDropdownPosition = ({ triggerRef, currentUserId }) => {
  if (currentUserId) return;

  const { viewportWidth, viewportHeight } = useListenViewport();

  // top is always default
  const [rightPosition, setRightPosition] = useState(null);
  const [bottomPosition, setBottomPosition] = useState(null);
  const [leftPosition, setLeftPosition] = useState(null);

  const handleDropdownPosition = () => {
    const rightAvailable =
      viewportWidth - triggerRef.current.getBoundingClientRect().right;

    const bottomAvailabe =
      viewportHeight - triggerRef.current.getBoundingClientRect().bottom;

    const triggerRefHeight = triggerRef.current.getBoundingClientRect().height;
    const dropdownWidth = 378;
    const dropdownHeight = 175;
    const heightMargin = 3;

    if (rightAvailable < dropdownWidth) setRightPosition(0);
    else setLeftPosition(0);

    if (bottomAvailabe < dropdownHeight) {
      setBottomPosition(triggerRefHeight + heightMargin);
    }
  };

  useEffect(() => {
    if (triggerRef.current) handleDropdownPosition();
  }, [triggerRef.current, viewportWidth]);

  console.log({ rightPosition, bottomPosition, leftPosition });

  return { rightPosition, bottomPosition, leftPosition };
};
