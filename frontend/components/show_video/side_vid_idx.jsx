import React from "react";
import { Link } from "react-router-dom";

function SideVideoIndex(props) {
  return (
    <ul>
      <li>
        <Link to={`/videos/${props.video.id}`}>
          <video height='170' width='303' src={props.video.videoUrl}></video>
          {props.video.title}
        </Link>
      </li>
      ))
    </ul>
  );
}

export default SideVideoIndex;
