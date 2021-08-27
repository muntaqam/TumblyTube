import React from "react";
import LikeInterface from "../likes/like_interface_container";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const ChildComments = (props) => {
  const { comment, renderDelete } = props;

  return (
    <div className='comments__card comments__card--child'>
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
          {/* {renderDelete(comment.id, comment.commenterId)} */}
        </div>
      </div>
    </div>
  );
};

export default ChildComments;
