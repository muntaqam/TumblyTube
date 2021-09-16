import React from "react";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import Dropdown from "../dropdown/dropdown";
import { useHandleClickOutside } from "../../hooks/useHandleClickOutside";
import Tooltip from "../tooltip/tooltip";

const DislikeButton = ({
  likeStatus,
  loggedIn,
  likeableType,
  numDislikes,
  handleLike,
}) => {
  const { showDropdown, triggerRef, dropdownRef } =
    useHandleClickOutside(false);

  return (
    <div style={{ position: "relative" }}>
      <Tooltip
        content={likeableType === "Video" ? "I dislike this" : "Dislike"}
      >
        <div
          ref={triggerRef}
          className='likes__container likes__container--dislike'
          onClick={() => handleLike("dislike")}
        >
          {likeStatus == -1 ? (
            <ThumbDownIcon id='thumbdown-icon' />
          ) : (
            <ThumbDownOutlinedIcon id='thumbdown-icon' />
          )}
          <div className='thumb__num thumb__num--dislikes'>{numDislikes}</div>
        </div>
      </Tooltip>
      {!loggedIn && showDropdown && (
        <Dropdown ref={dropdownRef} mode={`${likeableType}Dislike`} />
      )}
    </div>
  );
};

export default DislikeButton;
