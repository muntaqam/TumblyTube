import { useState, useEffect } from "react";

const useHandleDropdownPosition = ({ triggerRef }) => {
  const [inlinePosition, setInlinePosition] = useState("");
  const [blockPosition, setBlockPosition] = useState("");

  const handleDropdownPosition = () => {
    const rightAvailable =
      viewportWidth - triggerRef.current.getBoundingClientRect().right;

    if (rightAvailable < 378) setInlinePosition("right");
    else setInlinePosition("left");
  };

  useEffect(() => {
    if (triggerRef.current) handleDropdownPosition();
  }, [triggerRef.current, viewportWidth]);

  console.log({ inlinePosition });

  return [inlinePosition, blockPosition];
};
