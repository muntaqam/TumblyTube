import { connect } from "react-redux";
import { fetchVideos } from "../../actions/videos_actions";
import SearchResults from "./search_results";

const mSTP = ({ entities: { users, videos } }) => {
  return {
    videos: videos,
    users: users,
  };
};

const mDTP = (dispatch) => {
  return {
    fetchVideos: (filter) => dispatch(fetchVideos(filter)),
  };
};

export default connect(mSTP, mDTP)(SearchResults);
