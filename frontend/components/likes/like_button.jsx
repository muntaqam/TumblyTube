import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import Dropdown from "../dropdown/dropdown";
import { useHandleClickOutside } from "../../hooks/useHandleClickOutside";
import { useHandleDropdownPosition } from "../../hooks/useHandleDropdownPosition";
import Tooltip from "../tooltip/tooltip";

const LikeButton = ({
  likeStatus,
  loggedIn,
  likeableType,
  numLikes,
  handleLike,
  currentUserId,
}) => {
  const { showDropdown, triggerRef, dropdownRef } =
    useHandleClickOutside(false);

  const { rightPosition, bottomPosition, leftPosition } =
    useHandleDropdownPosition({ triggerRef, currentUserId });

  return (
    <div style={{ position: "relative" }}>
      <Tooltip content={likeableType === "Video" ? "I like this" : "Like"}>
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
      </Tooltip>
      {!loggedIn && showDropdown && (
        <Dropdown
          ref={dropdownRef}
          mode={`${likeableType}Like`}
          right={rightPosition}
          bottom={bottomPosition}
          left={leftPosition}
        />
      )}
    </div>
  );
};

export default LikeButton;
