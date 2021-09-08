import React, { useEffect } from "react";
import LoginButton from "../login_button";
import MainVideoIndexItem from "../video_index/main_vid_idx_item";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import VideoLibraryOutlinedIcon from "@material-ui/icons/VideoLibraryOutlined";
import { avatarFromInitials } from "../../../util/avatar_util";

export default function Library({
  currentUser,
  loggedIn,
  videos,
  fetchVideos,
}) {
  if (!loggedIn) {
    return (
      <div className='library__session'>
        <VideoLibraryOutlinedIcon id='library-session-logo' />
        <div className='library__sessionItem library__sessionItem--title'>
          Enjoy your favorite videos
        </div>
        <div className='library__sessionItem library__sessionItem--subtitle'>
          Sign in to access videos that you've liked
        </div>
        <LoginButton />
      </div>
    );
  }

  useEffect(() => {
    if (isVideosEmpty()) fetchVideos();
  }, []);

  const isVideosEmpty = () => {
    return Object.keys(videos).length === 0;
  };
  const likedVideos = Object.keys(currentUser.likedVideos);

  if (isVideosEmpty()) return null;
  else
    return (
      <div className='main__library'>
        <div className='library__title'>
          <ThumbUpOutlinedIcon id='library-likeicon' />
          Liked videos{" "}
          <span className='library__subtitle'>{likedVideos.length}</span>
        </div>
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
          <div className='library__useritems'>
            <div className='library__useritem library__useritem--subs'>
              <span className='library__tag'>Subscriptions</span>
              111k
            </div>
            <div className='library__useritem library__useritem--uploads'>
              <span className='library__tag'>Uploads</span>2
            </div>
            <div className='library__useritem library__useritem--likes'>
              <span className='library__tag'>Likes</span>
              {likedVideos.length}
            </div>
          </div>
        </div>
      </div>
    );
}
