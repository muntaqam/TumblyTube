import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { fetchVideos } from "../../../actions/videos_actions";
import { withRouter } from "react-router-dom";

function SearchBar(props) {
  const { fetchVideos } = props;
  const [body, setBody] = useState("");


  function handleInput(e) {
    setBody(e.currentTarget.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // fetchVideos(body);
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
