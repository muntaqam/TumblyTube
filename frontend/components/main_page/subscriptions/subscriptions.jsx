import React, { useEffect } from "react";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import LoginButton from "../login_button";
import MainVideoIndexItem from "../video_index/main_vid_idx_item";
import { avatarFromInitials } from "../../../util/avatar_util";
import SubscribeButtonContainer from "../../subscribe_button/subscribe_btn_container";

export default function Subscriptions({
  currentUserId,
  currentUser,
  videos,
  fetchVideos,
}) {
  if (!currentUserId) {
    return (
      <div className='subs__session'>
        <SubscriptionsOutlinedIcon id='subs-session-logo' />
        <div className='subs__sessionItem subs__sessionItem--title'>
          Don’t miss new videos
        </div>
        <div className='subs__sessionItem subs__sessionItem--subtitle'>
          Sign in to see updates from your favorite TumblyTube channels
        </div>
        <LoginButton />
      </div>
    );
  }

  const isVideosEmpty = () => {
    return Object.keys(videos).length === 0;
  };

  useEffect(() => {
    if (isVideosEmpty()) fetchVideos();
  }, []);

  const filteredSubVideosArr = Object.values(videos).filter(
    // subscribee username(keys) are not Capitalized but video.creator username is
    (vid) => currentUser.subscribees[vid.creator.username.toLowerCase()]
  );

  const filteredSubUsersArr = Object.values(currentUser.subscribees);

  if (isVideosEmpty()) return null;
  return (
    <div className='main__subs'>
      <div className='subs__title subs__title--video'>Latest Videos</div>
      {!filteredSubVideosArr.length ? (
        <div className='subs__nosubs'>
          Videos from your subscriptions will go here
        </div>
      ) : (
        <div className='subs__split subs__split--videos'>
          {filteredSubVideosArr.reverse().map((vid) => (
            <MainVideoIndexItem
              key={vid.id}
              video={vid}
              creator={vid.creator}
            />
          ))}
        </div>
      )}

      <div className='subs__title subs__title--channel'>
        Channels
        <span className='subs__subtitle'>{currentUser.numSubscribees}</span>
      </div>
      {!filteredSubUsersArr.length ? (
        <div className='subs__nosubs'>
          Your subscribed channels will go here
        </div>
      ) : (
        <div className='subs__split subs__split--users'>
          {filteredSubUsersArr.reverse().map((user) => (
            <div key={user.id} className='subs__user'>
              <div className='subs__usericonContainer'>
                <img
                  src={avatarFromInitials(user, 96)}
                  alt='avatar'
                  className='subs__usericon'
                />
              </div>
              <div className='subs__username'>{user.username}</div>
              <div className='subs__userstats'>
                {`${user.numSubscribers} subscribers • ${user.numVideos} videos`}
              </div>
              <SubscribeButtonContainer key={user.id} creator={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
