import React from "react";
import { Link } from "react-router-dom";
import { avatarFromInitials } from "../../../util/avatar_util";
import {
  handleAutoPlayIn,
  handleAutoPlayOut,
  viewsFormatted,
} from "../../../util/video_util";

function MainVideoIndexItem(props) {
  const { video, creator } = props;

  return (
    <Link className='main__card' to={`/watch/${video.id}`}>
      <video
        className='main__vid'
        muted
        onMouseEnter={handleAutoPlayIn}
        onMouseOut={handleAutoPlayOut}
      >
        <source src={video.videoUrl} />
      </video>
      <div className='main__desc'>
        <img
          src={avatarFromInitials(video.creator, 32)}
          alt=''
          className='main__user'
        />
        <div className='main__desc main__desc--meta'>
          <div className='main__title'>{video.title}</div>
          <div className='main__username'>{creator.username}</div>
          <div className='main__viewsdate'>
            {viewsFormatted(video.views)} views
            <span className='main__dot'> ● </span>
            {video.uploadedAt} ago
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MainVideoIndexItem;
