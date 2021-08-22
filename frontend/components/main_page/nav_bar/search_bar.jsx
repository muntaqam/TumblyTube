import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { withRouter, useLocation } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { fetchUsers } from "../../../actions/session_actions";

function SearchBar(props) {
  const [body, setBody] = useState("");
  const searchQuery = useQuery();
  const initialClick = useRef(true);

  useEffect(() => {
    if (searchQuery) setBody(searchQuery);
    else setBody("");
  }, [searchQuery]);

  function useQuery() {
    const query = new URLSearchParams(useLocation().search);
    return query.get("search_query");
  }

  function handleInput(e) {
    setBody(e.currentTarget.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (initialClick.current) { // check if it's the first time being clicked
      initialClick.current = false;
      props.fetchUsers(body.toLowerCase()); // fetchUsers on the first click
    } else {
      if (!checkUsersInState()) props.fetchUsers(body.toLowerCase());
    }

    props.history.push(`/results?search_query=${body}`);
  }

  function checkUsersInState() {
    let users = props.users;

    return users.some((user) => {
      let lowCaseUsername = user.username.toLowerCase();
      return lowCaseUsername.includes(body.toLowerCase());
    });
  }

  return (
    <form className='navbar__search'>
      <input
        type='text'
        className='navbar__search__input'
        placeholder='Search'
        value={body}
        onChange={handleInput}
      />
      <button className='navbar__search__button' onClick={handleSubmit}>
        <SearchIcon
          id='search-button'
          className='navbar__icon navbar__icon--search'
        />
        <div className='navbar__tooltip navbar__tooltip--search'>Search</div>
      </button>
    </form>
  );
}

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
