import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, useLocation } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

function SearchBar(props) {
  const [body, setBody] = useState("");
  const searchQuery = useQuery();

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
    props.history.push(`/results?search_query=${body}`);
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVideos: (filter) => dispatch(fetchVideos(filter)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(SearchBar));
