import React from "react";
import { useRef, useState } from "react";
import { useHandleClickOutside } from "../../hooks/useHandleClickOutside";

const RequireLoginDD = ({ mode, blockPos = "bottom", leftPos = 0 }) => {
  const dropDownRef = useRef();
  const [showDropDown, setShowDropDown] = useState(false);

  useHandleClickOutside(dropDownRef, showDropDown, setShowDropDown);

  const styles = {
    position: "absolute",
    width: "378px",
    height: "175px",
    top: `${blockPos === "top" ? "0" : null}`,
    bottom: `${blockPos === "bottom" ? "0" : null}`,
    left: leftPos,
  };

  let title;
  let subtitle;
  switch (mode) {
    case "like":
      title = "Like this video?";
      subtitle = "Sign in to make your opinion count.";
      break;
    case "dislike":
      title = "Dislike this video?";
      subtitle = "Sign in to make your opinion count.";
      break;
    case "subscribe":
      title = "Want to subscribe to this channel?";
      subtitle = "Sign in to subscribe to this channel.";
      break;
    case "upload":
      title = "Want to upload a video?";
      subtitle = "Sign in to upload your video";
      break;
  }

  return (
    <div ref={dropDownRef} style={styles} className='requireLoginDD'>
      <section className='requireLoginDD__split requireLoginDD__split--top'>
        <div className='requireLoginDD__title'>{title}</div>
        <div className='requireLoginDD__subtitle'>{subtitle}</div>
      </section>
      <section className='requireLoginDD__split requireLoginDD__split--bottom'>
        <div className='requireLoginDD__button'>SIGN IN</div>
      </section>
    </div>
  );
};

export default RequireLoginDD;
