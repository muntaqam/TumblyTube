import React from "react";
import { connect } from "react-redux";
import MainVideoIndex from "./main_vid_idx";
import { fetchVideos } from "../../../actions/videos_actions";

const mSTP = ({ entities }) => {
  return {
    videos: Object.values(entities.videos),
  };
};

const mDTP = (dispatch) => {
  return {
    fetchVideos: () => dispatch(fetchVideos()),
  };
};

export default connect(mSTP, mDTP)(MainVideoIndex);
