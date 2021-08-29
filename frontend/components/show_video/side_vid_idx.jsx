import React from "react";
import { Link } from "react-router-dom";

function SideVideoIndex(props) {
  const { video } = props;

  function handleMouseEnter(e) {
    e.target.play();
  }

  function handleMouseOut(e) {
    e.target.currentTime = 0;
    e.target.pause();
  }

  return (
    <Link className='sideidx__card' to={`/watch/${video.id}`}>
      <video
        className='sideidx__vid'
        muted
        src={video.videoUrl}
        onMouseEnter={handleMouseEnter}
        onMouseOut={handleMouseOut}
      ></video>
      <div className='sideidx__desc'>
        <div className='sideidx__title'>{video.title}</div>
        <div className='sideidx__username'>{video.username}</div>
        <div className='sideidx__viewsdate'>
          {video.views} views
          <span className='sideidx__dot'>●</span>
          {video.uploadedAt} ago
        </div>
      </div>
    </Link>
  );
}

export default SideVideoIndex;
