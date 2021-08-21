import React from "react";
import { Link } from "react-router-dom";

function MainVideoIndexItem(props) {
  const { video } = props;
  return (
    <div>
      <Link to={`/watch/${video.id}`}>
        <video height='170' width='303'>
          <source src={video.videoUrl} />
        </video>
        {video.title}
      </Link>
    </div>
  );
}

export default MainVideoIndexItem;
