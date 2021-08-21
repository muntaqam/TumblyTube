import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../main_page/nav_bar/nav_bar_container";
import MainVideoIndexItem from "../main_page/video_index/main_vid_idx_item";

function SearchResults(props) {
  const { videos, users, fetchVideos } = props;
  const searchQuery = useQuery();

  useEffect(() => {
    if (!videos.length) fetchVideos();
  }, []);

  function useQuery() {
    const query = new URLSearchParams(useLocation().search);
    return query.get("search_query").toLowerCase();
  }

  const filterVideo = (video) => {
    let title = video.title.toLowerCase();
    if (title.includes(searchQuery)) {
      return <MainVideoIndexItem video={video} />;
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Search Results</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>{filterVideo(video)}</li>
        ))}
      </ul>
    </div>
  );
}
export default SearchResults;
