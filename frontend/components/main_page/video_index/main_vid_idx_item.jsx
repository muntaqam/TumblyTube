import React from "react";
import { Link } from "react-router-dom";
import { avatarFromInitials } from "../../../util/avatar_util";
import {
  handleAutoPlayIn,
  handleAutoPlayOut,
  viewsFormatted,
} from "../../../util/video_util";
import Tooltip from "../../tooltip/tooltip";

function MainVideoIndexItem(props) {
  const { video, creator } = props;

  return (
    <Link className='main__card' to={`/watch/${video.id}`}>
      <video
        className='main__vid'
        preload='metadata'
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
          <Tooltip content={creator.username} position='top'>
            <div className='main__username'>{creator.username}</div>
          </Tooltip>
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
