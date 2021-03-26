import React, { Component } from "react";
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStr: "",
    };
  }

  update() {
    return (e) => this.setState({ searchStr: e.currentTarget.value });
  }
  render() {
    return (
      <form className="navbar__search">
        <input
          type="text"
          className="navbar__search__input"
          placeholder="Search"
          onChange={this.update()}
        />
        <button className="navbar__search__button">
          <SearchIcon
            id="search-button"
            className="navbar__icon navbar__icon--search"
          />
          <div className="navbar__tooltip navbar__tooltip--search">Search</div>
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(SearchBar);
