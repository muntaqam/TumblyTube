import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import Dropdown from "../dropdown/dropdown";
import { useHandleClickOutside } from "../../hooks/useHandleClickOutside";

const LikeButton = ({
  likeStatus,
  loggedIn,
  likeableType,
  numLikes,
  handleLike,
}) => {
  const { showDropdown, triggerRef, dropdownRef } =
    useHandleClickOutside(false);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={triggerRef}
        className='likes__container likes__container--like'
        onClick={() => handleLike("like")}
      >
        {likeStatus == 1 ? (
          <ThumbUpIcon id='thumbup-icon' />
        ) : (
          <ThumbUpOutlinedIcon id='thumbup-icon' />
        )}
        <div className='thumb__num thumb__num--likes'>{numLikes}</div>
      </div>
      {!loggedIn && showDropdown && (
        <Dropdown ref={dropdownRef} mode={`${likeableType}Like`} />
      )}
    </div>
  );
};

export default LikeButton;