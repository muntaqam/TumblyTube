import React, { useEffect } from "react";
import MainVideoIndexItem from "../video_index/main_vid_idx_item";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import { avatarFromInitials } from "../../../util/avatar_util";

export default function Library({ currentUser, videos, fetchVideos }) {
  useEffect(() => {
    if (isVideosEmpty()) fetchVideos();
  }, []);

  const isVideosEmpty = () => {
    return Object.keys(videos).length === 0;
  };

  const likedVideos = Object.keys(currentUser.likedVideos);

  if (isVideosEmpty()) return null;
  return (
    <div className='main__library'>
      <div className='library__split library__split--videos'>
        {likedVideos.map((likedId) => (
          <MainVideoIndexItem
            key={likedId}
            video={videos[likedId]}
            creator={currentUser}
          />
        ))}
      </div>
      <div className='library__split library__split--user'>
        <div className='library__usericon'>
          <img
            src={avatarFromInitials(currentUser, 80)}
            alt='avatar'
            className='library__user'
          />
        </div>
        <div className='library__username'>{currentUser.username}</div>
        <div className='library__usermeta'>
          <div className='library__subscriptions'>
            <span className='library__tag'>Subscriptions</span>
            111k
          </div>
          <div className='library__uploads'>
            <span className='library__tag'>Uploads</span>2
          </div>
          <div className='library__likes'>
            <span className='library__tag'>Likes</span>
            {likedVideos.length}
          </div>
        </div>
      </div>
    </div>
  );
}
