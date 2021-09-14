import React, { forwardRef } from "react";

const Dropdown = forwardRef(({ mode }, ref) => {
  const styles = {
    position: "absolute",
    width: "378px",
    height: "175px",
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
      subtitle = "Sign in to share your video with the world.";
      break;
  }

  return (
    <div ref={ref} style={styles} className='requireLoginDD'>
      <section className='requireLoginDD__split requireLoginDD__split--top'>
        <div className='requireLoginDD__title'>{title}</div>
        <div className='requireLoginDD__subtitle'>{subtitle}</div>
      </section>
      <section className='requireLoginDD__split requireLoginDD__split--bottom'>
        <div className='requireLoginDD__button'>SIGN IN</div>
      </section>
    </div>
  );
});

export default Dropdown;
