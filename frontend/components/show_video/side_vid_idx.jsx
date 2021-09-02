import React from "react";
import { Link } from "react-router-dom";
import {
  viewsFormatted,
  handleAutoPlayIn,
  handleAutoPlayOut,
} from "../../util/video_util";

function SideVideoIndex(props) {
  const { video } = props;

  return (
    <Link className='sideidx__card' to={`/watch/${video.id}`}>
      <video
        className='sideidx__vid'
        muted
        src={video.videoUrl}
        onMouseEnter={handleAutoPlayIn}
        onMouseOut={handleAutoPlayOut}
      ></video>
      <div className='sideidx__desc'>
        <div className='sideidx__title'>{video.title}</div>
        <div className='sideidx__username'>{video.username}</div>
        <div className='sideidx__viewsdate'>
          {viewsFormatted(video.views)} views
          <span className='sideidx__dot'> ● </span>
          {video.uploadedAt} ago
        </div>
      </div>
    </Link>
  );
}

export default SideVideoIndex;
