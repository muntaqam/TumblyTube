import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

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

  async function handleSubmit(e) {
    e.preventDefault();

    if (initialClick.current) {
      initialClick.current = false;
      await props.fetchUsers(body.toLowerCase()); // fetchUsers on the first click
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

export default SearchBar;
