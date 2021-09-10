import React, { useEffect } from "react";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import LoginButton from "../login_button";

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

  useEffect(() => {
    if (isVideosEmpty()) fetchVideos();
  }, []);

  const isVideosEmpty = () => {
    return Object.keys(videos).length === 0;
  };

  if (isVideosEmpty()) return null;
  else
    return (
      <div className='main__subscriptions'>
        <h1>SUBSCRIPTIONS</h1>
      </div>
    );
}
