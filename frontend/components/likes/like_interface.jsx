import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";

function LikeInterface(props) {
  const {
    likeableType,
    likeableId,
    numLikes,
    numDislikes,
    createLike,
    deleteLike,
    currentUser,
  } = props;

  // 0 if no likes, 1 if liked, -1 if disliked
  const [likeStatus, setLikeStatus] = useState(0);
  // check if newLike is already in users slice of state
  const isLiked = currentUser[`liked${likeableType}s`][likeableId];

  useEffect(() => {
    if (isLiked) changeLikeStatus(isLiked.version);
    else changeLikeStatus("nolikes");
  }, [props.match.params.id]);

  const changeLikeStatus = (type) => {
    if (type == "like") setLikeStatus(1);
    if (type == "dislike") setLikeStatus(-1);
    if (type == "nolikes") setLikeStatus(0);
  };

  async function handleLike(version) {
    // set passed down properties to newLike obj for later use
    const newLike = {
      likeable_type: likeableType,
      likeable_id: likeableId,
      version: version,
    };

    // deleteLike, if liked and version is the same {eg: dislike == dislike}
    if (isLiked && isLiked.version == version) {
      changeLikeStatus("nolikes");
      deleteLike(isLiked.id);
      return;
    }

    // deleteLike then create newLike, if liked and version isn't the same
    if (isLiked && isLiked.version != version) {
      changeLikeStatus(version);
      await deleteLike(isLiked.id);
      createLike(newLike);
      return;
    }

    // create new like, if not yet liked
    changeLikeStatus(version);
    createLike(newLike);
  }

  return (
    <div className='likes'>
      <div className='likes__container likes__container--like'>
        {likeStatus == 1 ? (
          <ThumbUpIcon id='thumbup-icon' onClick={() => handleLike("like")} />
        ) : (
          <ThumbUpOutlinedIcon
            id='thumbup-icon'
            onClick={() => handleLike("like")}
          />
        )}
        <div className='thumb__num'>{numLikes}</div>
      </div>
      <div className='likes__container likes__container--dislike'>
        {likeStatus == -1 ? (
          <ThumbDownIcon
            id='thumbdown-icon'
            onClick={() => handleLike("dislike")}
          />
        ) : (
          <ThumbDownOutlinedIcon
            id='thumbdown-icon'
            onClick={() => handleLike("dislike")}
          />
        )}

        <div className='thumb__num'>{numDislikes}</div>
      </div>
    </div>
  );
}
export default LikeInterface;
