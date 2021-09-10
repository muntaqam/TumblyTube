import React from "react";
import { connect } from "react-redux";
import Library from "./library";
import { fetchVideos } from "../../../actions/videos_actions";

const mSTP = ({ session, entities: { users, videos } }) => {
  return {
    currentUserId: session.id,
    currentUser: users[session.id],
    videos: videos,
  };
};

const mDTP = (dispatch) => {
  return {
    fetchVideos: () => dispatch(fetchVideos()),
  };
};

export default connect(mSTP, mDTP)(Library);
