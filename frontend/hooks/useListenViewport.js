import { useEffect, useState } from "react";

export const useListenViewport = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const updateMedia = () => {
    setViewportWidth(window.innerWidth);
    setViewportHeight(window.innerHeight);
  };

  // listen and set browser width
  useEffect(() => {
    window.addEventListener("resize", updateMedia);

    return () => window.removeEventListener("resize", updateMedia);
  }, [viewportWidth, viewportHeight]);

  return { viewportWidth, viewportHeight };
};
