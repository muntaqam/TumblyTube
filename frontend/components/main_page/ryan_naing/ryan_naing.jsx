import React from "react";
import { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHandleClickOutside } from "../../../hooks/useHandleClickOutside";
import { closeDropdown, openDropdown } from "../../../actions/dropdown_actions";
import Dropdown from "../../dropdown/dropdown";

function RyanNaing({ dropdown, closeDropdown, openDropdown }) {
  const likeRef = useRef();
  const dislikeRef = useRef();
  const [showDropDown, setShowDropDown] = useState(false);

  useHandleClickOutside({
    dropDownRef: dropdown === "like" ? likeRef : dislikeRef,
    showDropDown,
    setShowDropDown,
  });

  // dispatch closeDropdown when !showDropdown
  // we dispatch it here because when there is a dropdown state, we want to close current dropdown and open a new one
  useEffect(() => {
    if (!showDropDown) closeDropdown();
  }, [showDropDown]);

  const handleClick = (e, type) => {
    e.stopPropagation();
    switch (type) {
      case "like":
        if (dropdown) {
          setShowDropDown(false);
        } else {
          openDropdown("like");
          setShowDropDown(true);
        }
        break;
      case "dislike":
        if (dropdown) {
          setShowDropDown(false);
        } else {
          openDropdown("dislike");
          setShowDropDown(true);
        }
        break;
    }
  };

  return (
    <div className='main__ryan'>
      <div ref={likeRef}>
        <h1
          onClick={(e) => handleClick(e, "like")}
          className='main__ryan main__ryan--like'
        >
          like
        </h1>
        {showDropDown && dropdown === "like" ? <Dropdown /> : null}
      </div>
      <div ref={dislikeRef}>
        <h2
          onClick={(e) => handleClick(e, "dislike")}
          className='main__ryan main__ryan--dislike'
        >
          dislike
        </h2>
        {showDropDown && dropdown === "dislike" ? <Dropdown /> : null}
      </div>
    </div>
  );
}

const mapStateToProps = ({ ui }) => {
  return {
    dropdown: ui.dropdown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openDropdown: (type) => dispatch(openDropdown(type)),
    closeDropdown: () => dispatch(closeDropdown()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RyanNaing);
