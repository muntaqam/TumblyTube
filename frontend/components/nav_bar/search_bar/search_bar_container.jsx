import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchUsers } from "../../../actions/session_actions";
import SearchBar from "./search_bar";

const mapStateToProps = ({ entities: { users } }) => {
  return {
    users: Object.values(users),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (filter) => dispatch(fetchUsers(filter)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar)
);
