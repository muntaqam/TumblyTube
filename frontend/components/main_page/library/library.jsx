import React, { useEffect } from "react";
import VideoLibraryOutlinedIcon from "@material-ui/icons/VideoLibraryOutlined";
import LoginButton from "../login_button";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import MainVideoIndexItem from "../video_index/main_vid_idx_item";
import { avatarFromInitials } from "../../../util/avatar_util";

export default function Library({
  currentUserId,
  currentUser,
  videos,
  fetchVideos,
}) {
  if (!currentUserId) {
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

  const filteredLikedVideosArr = Object.values(currentUser.likedVideos).filter(
    (liked) => liked.version === "like"
  );

  if (isVideosEmpty()) return null;
  else
    return (
      <div className='main__library'>
        <div className='library__title'>
          <ThumbUpOutlinedIcon id='library-likeicon' />
          Liked videos{" "}
          <span className='library__subtitle'>
            {filteredLikedVideosArr.length}
          </span>
        </div>
        {!filteredLikedVideosArr.length && (
          <div className="library__empty">
            Your Liked videos will go here
          </div>
        )}
        <div className='library__split library__split--videos'>
          {filteredLikedVideosArr.map((liked) => (
            <MainVideoIndexItem
              key={liked.likeableId}
              video={videos[liked.likeableId]} // liked object doesn't have videoUrl
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
              {currentUser.numSubscribees}
            </div>
            <div className='library__useritem library__useritem--uploads'>
              <span className='library__tag'>Uploads</span>
              {currentUser.numVideos}
            </div>
            <div className='library__useritem library__useritem--likes'>
              <span className='library__tag'>Likes</span>
              {filteredLikedVideosArr.length}
            </div>
          </div>
        </div>
      </div>
    );
}
