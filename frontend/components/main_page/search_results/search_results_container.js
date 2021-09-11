import { connect } from "react-redux";
import { fetchUsers } from "../../../actions/session_actions";
import { fetchVideos } from "../../../actions/videos_actions";
import SearchResults from "./search_results";

const mSTP = ({ entities: { users, videos }, session }) => {
  return {
    videos: Object.values(videos),
    users: Object.values(users),
    currentUserId: session.id,
  };
};

const mDTP = (dispatch) => {
  return {
    fetchVideos: () => dispatch(fetchVideos()),
    fetchUsers: (filter) => dispatch(fetchUsers(filter)),
  };
};

export default connect(mSTP, mDTP)(SearchResults);
