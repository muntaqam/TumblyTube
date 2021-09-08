import React from "react";
import { connect } from "react-redux";
import Library from "./library";
import { fetchVideos } from "../../../actions/videos_actions";

const mSTP = ({ session, entities: { users, videos } }) => {
  return {
    currentUser: users[session.id],
    loggedIn: session.id,
    videos: videos,
    likedVideosArr: Object.values(users[session.id].likedVideos),
  };
};

const mDTP = (dispatch) => {
  return {
    fetchVideos: () => dispatch(fetchVideos()),
  };
};

export default connect(mSTP, mDTP)(Library);
