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
        <Link to={`/videos/${props.video.id}`}>
          <video
            height='170'
            width='303'
            src={props.video.videoUrl}
            onMouseEnter={handleMouseEnter}
            onMouseOut={handleMouseOut}
          ></video>
          {props.video.title}
          {props.video.username}
          {props.video.created_at}
        </Link>
      </li>
    </ul>
  );
}

export default SideVideoIndex;
