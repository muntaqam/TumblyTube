import React from "react";
import { Link } from "react-router-dom";

function SideVideoIndex(props) {
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
        <Link to={`/watch/${props.video.id}`}>
          <video
            muted
            height='170'
            width='303'
            src={props.video.videoUrl}
            onMouseEnter={handleMouseEnter}
            onMouseOut={handleMouseOut}
          ></video>
        </Link>
        <div>
          <div>{props.video.title}</div>
          <div>{props.video.username}</div>
          <div>
            <span>{props.video.views} views</span>
            <span>●</span>
            <span>{`${props.video.uploadedAt} ago`}</span>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default SideVideoIndex;
