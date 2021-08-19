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
  const [status, setStatus] = useState("");

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
        setStatus("");
        return;
      }
      // deleteLike then create newLike, if liked and version isn't the same
      await deleteLike(liked.id);
    }
    // create newLike, if not yet liked
    createLike(newLike);
    setStatus(`${version}d`);
  }

  return (
    <div className='like'>
      <div>
        <ThumbUpIcon
          className={`like__button-like ${status}`}
          id='thumbup-icon'
          onClick={() => handleLike("like")}
        />
        <div>{numLikes}</div>
      </div>
      <div>
        <ThumbDownIcon
          className={`like__button-dislike ${status}`}
          id='thumbdown-icon'
          onClick={() => handleLike("dislike")}
        />
        <div>{numDislikes}</div>
      </div>
    </div>
  );
}
export default LikeInterface;
