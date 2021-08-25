import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

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
  const [status, setStatus] = useState("inactive");

  async function handleLike(version) {
    // set passed down properties to newLike obj for later use
    const newLike = {
      likeable_type: likeableType,
      likeable_id: likeableId,
      version: version,
    };
    // set liked, if newLike is already in users slice of state
    const liked = currentUser[`liked${likeableType}s`][likeableId];
    if (liked) {
      // deleteLike, if liked and version is the same eg: dislike == dislike
      if (liked.version == version) {
        deleteLike(liked.id);
        setStatus("inactive");
        return;
      }
      // deleteLike then create newLike, if liked and version isn't the same
      await deleteLike(liked.id);
    }
    // create newLike, if not yet liked
    createLike(newLike);
    setStatus(`active`);
  }

  return (
    <div className='likes'>
      <div className='likes__container'>
        <ThumbUpIcon
          className={`thumb thumb--${status}`}
          id='thumbup-icon'
          onClick={() => handleLike("like")}
        />
        <div className={`thumb__num thumb__num--${status}`}>{numLikes}</div>
      </div>
      <div className='likes__container'>
        <ThumbDownIcon
          className={`thumb thumb--${status}`}
          id='thumbdown-icon'
          onClick={() => handleLike("dislike")}
        />
        <div className={`thumb__num thumb__num--${status}`}>{numDislikes}</div>
      </div>
    </div>
  );
}
export default LikeInterface;
