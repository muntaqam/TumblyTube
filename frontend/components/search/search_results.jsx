import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import MainVideoIndexItem from "../main_page/video_index/main_vid_idx_item";

function SearchResults(props) {
  const { videos, users, fetchVideos, fetchUsers } = props;
  const searchQuery = useQuery().toLowerCase();

  useEffect(() => {
    if (!videos.length) fetchVideos();
    // if (!checkUsersInState()) fetchUsers(searchQuery);
  }, []);

  function useQuery() {
    const query = new URLSearchParams(useLocation().search);
    return query.get("search_query");
  }

  function checkUsersInState() {
    users.map((user) => {
      let lowCaseUsername = user.username.toLowerCase();

      return lowCaseUsername.includes(searchQuery);
    });
  }

  function filterType(type, object) {
    if (type === "user") {
      let username = object.username.toLowerCase();

      if (username.includes(searchQuery)) {
        return (
          <div>
            <div>{object.username}</div>
            <div>{`${object.numVideos} videos`}</div>
          </div>
        );
      }
    }

    if (type === "video") {
      let title = object.title.toLowerCase();

      if (title.includes(searchQuery)) {
        return <MainVideoIndexItem video={object} />;
      }
    }
  }

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{filterType("user", user)}</li>
        ))}
        {videos.map((video) => (
          <li key={video.id}>{filterType("video", video)}</li>
        ))}
      </ul>
    </div>
  );
}
export default SearchResults;
