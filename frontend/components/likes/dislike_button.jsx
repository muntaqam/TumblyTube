import React from "react";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import Dropdown from "../dropdown/dropdown";
import { useHandleClickOutside } from "../../hooks/useHandleClickOutside";
import { useHandleDropdownPosition } from "../../hooks/useHandleDropdownPosition";
import Tooltip from "../tooltip/tooltip";

const DislikeButton = ({
  likeStatus,
  loggedIn,
  likeableType,
  numDislikes,
  handleLike,
  currentUserId,
}) => {
  const { showDropdown, triggerRef, dropdownRef } =
    useHandleClickOutside(false);

  const { rightPosition, bottomPosition, leftPosition } =
    useHandleDropdownPosition({ triggerRef, currentUserId });

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
        <Dropdown
          ref={dropdownRef}
          mode={`${likeableType}Dislike`}
          right={rightPosition}
          bottom={bottomPosition}
          left={leftPosition}
        />
      )}
    </div>
  );
};

export default DislikeButton;
