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
    <ul>
      <li>
        <Link to={`/watch/${video.id}`}>
          <video
            muted
            height='170'
            width='303'
            src={video.videoUrl}
            onMouseEnter={handleMouseEnter}
            onMouseOut={handleMouseOut}
          ></video>
        </Link>
        <div>
          <div>{video.title}</div>
          <div>{video.username}</div>
          <div>
            <span>{video.views} views</span>
            <span>●</span>
            <span>{`${video.uploadedAt} ago`}</span>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default SideVideoIndex;
