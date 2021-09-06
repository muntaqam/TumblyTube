import React from "react";
import { connect } from "react-redux";
import Library from "./library";
import { fetchVideos } from "../../../actions/videos_actions";

const mSTP = ({ entities, session }) => {
  return {
    currentUser: entities.users[session.id],
    videos: entities.videos,
  };
};

const mDTP = (dispatch) => {
  return {
    fetchVideos: () => dispatch(fetchVideos()),
  };
};

export default connect(mSTP, mDTP)(Library);
