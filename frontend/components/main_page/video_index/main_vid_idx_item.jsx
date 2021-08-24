import React from "react";
import { Link } from "react-router-dom";

function MainVideoIndexItem(props) {
  const { video } = props;
  return (
    <Link className='main__card' to={`/watch/${video.id}`}>
      <video className='main__vid'>
        <source src={video.videoUrl} />
      </video>
      <div className='main__dec'>
        <div className='main__title'>{video.title}</div>
        <div className='main__username'>{video.username}</div>
        <div className='main__viewsdate'>
          {video.views} views ● {video.uploadedAt} ago
        </div>
      </div>
    </Link>
  );
}

export default MainVideoIndexItem;
