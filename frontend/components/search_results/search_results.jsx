import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  handleAutoPlayIn,
  handleAutoPlayOut,
  viewsFormatted,
} from "../../util/video_util";
import { avatarFromInitials } from "../../util/avatar_util";
import SubscribeButtonContainer from "../subscribe_button/subscribe_btn_container";

function SearchResults(props) {
  const { videos, users, currentUserId, fetchVideos, fetchUsers } = props;
  const searchQuery = useQuery().toLowerCase();

  useEffect(() => {
    if (!videos.length) fetchVideos();
    if (users.length <= 1) fetchUsers(searchQuery); // logged-in user already in state. Hence, users.length <= 1
  }, []);

  function useQuery() {
    const query = new URLSearchParams(useLocation().search);
    return query.get("search_query");
  }

  // filter users and videos based on search query string
  function filterByType(type, object) {
    if (type === "user") {
      let username = object.username.toLowerCase();

      if (username.includes(searchQuery)) {
        return (
          <div key={object.id} className='results__item results__item--user'>
            <div className='results__split results__split--left'>
              <img
                src={avatarFromInitials(object, 130)}
                alt='avatar'
                className='results__user'
              />
            </div>
            <div className='results__split results__split--right'>
              <div className='results__title'>{object.username}</div>
              <div className='results__meta results__meta--numVideos'>
                {`${object.numSubscribees} subscribers • ${object.numVideos} videos`}
              </div>
            </div>
            {currentUserId != object.id && (
              <SubscribeButtonContainer creator={object} />
            )}
          </div>
        );
      }
    }

    if (type === "video") {
      let title = object.title.toLowerCase();
      const creator = object.creator;

      if (title.includes(searchQuery)) {
        return (
          <Link
            key={object.id}
            className='results__item results__item--video'
            to={`/watch/${object.id}`}
          >
            <div className='results__split results__split--left'>
              <video
                className='results__video'
                muted
                onMouseEnter={handleAutoPlayIn}
                onMouseOut={handleAutoPlayOut}
              >
                <source src={object.videoUrl} />
              </video>
            </div>
            <div className='results__split results__split--right'>
              <div className='results__title'>{object.title}</div>
              <div className='results__meta results__meta--views'>
                {viewsFormatted(object.views)} views
                <span className='results__dot'> ● </span>
                {object.uploadedAt} ago
              </div>
              <div className='results__meta results__meta--username'>
                <img
                  src={avatarFromInitials(object.creator, 24)}
                  alt='avatar'
                  className='results__user'
                />
                {creator.username}
              </div>
              <div className='results__meta results__meta--desc'>
                {object.description}
              </div>
            </div>
          </Link>
        );
      }
    }
  }

  return (
    <div className='results'>
      <div className='results__header'>Search Results</div>
      <div className='results__items'>
        {users.map((user) => filterByType("user", user))}
        {videos.map((video) => filterByType("video", video))}
      </div>
    </div>
  );
}
export default SearchResults;
