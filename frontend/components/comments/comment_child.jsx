import React, { useState, forwardRef, useImperativeHandle } from "react";
import LikeInterface from "../likes/like_interface_container";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const ChildComments = forwardRef((props, ref) => {
  const { comment, renderDelete } = props;
  const [toggled, setToggled] = useState(false);

  const toggleComments = () => {
    if (toggled) setToggled(false);
    else setToggled(true);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleComments: toggleComments,
    };
  });

  return (
    <div
      className={`comments__card comments__card--${toggled ? "" : "hidden"}`}
      {...props}
    >
      <div className='comments__usericon'>
        <AccountCircleIcon />
      </div>
      <div className='comments__details'>
        <div className='comments__username'>
          {comment.username}{" "}
          <span className='comments__date'>{`${comment.commentedAt} ago`}</span>
        </div>
        <div className='comments__body'>{comment.body}</div>
        <div className='comments__interface'>
          <LikeInterface
            likeableId={comment.id}
            likeableType='Comment'
            numLikes={comment.numLikes}
            numDislikes={comment.numDislikes}
          />
          {renderDelete(comment.id, comment.commenterId)}
        </div>
      </div>
    </div>
  );
});

export default ChildComments;
