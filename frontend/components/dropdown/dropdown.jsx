import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { useListenViewport } from "../../hooks/useListenViewport";

const Dropdown = forwardRef(({ mode, right, bottom, left }, ref) => {
  const styles = {
    position: "absolute",
    width: "378px",
    height: "175px",
    right: right,
    bottom: bottom,
    left: left,
  };

  const { viewportWidth } = useListenViewport();

  let title;
  let subtitle;
  switch (mode) {
    case "VideoLike":
      title = "Like this video?";
      subtitle = "Sign in to make your opinion count.";
      break;
    case "VideoDislike":
      title = "Dislike this video?";
      subtitle = "Sign in to make your opinion count.";
      break;
    case "CommentLike":
      title = "Like this comment?";
      subtitle = "Sign in to make your opinion count.";
      break;
    case "CommentDislike":
      title = "Dislike this comment?";
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

  if (viewportWidth <= 530) return null;
  return (
    <div ref={ref} style={styles} className='requireLoginDD'>
      <section className='requireLoginDD__split requireLoginDD__split--top'>
        <div className='requireLoginDD__title'>{title}</div>
        <div className='requireLoginDD__subtitle'>{subtitle}</div>
      </section>
      <section className='requireLoginDD__split requireLoginDD__split--bottom'>
        <Link to='/login' className='requireLoginDD__button'>
          SIGN IN
        </Link>
      </section>
    </div>
  );
});

export default Dropdown;
