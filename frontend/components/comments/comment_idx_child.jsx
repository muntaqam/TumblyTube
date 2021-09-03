import React from "react";
import LikeInterface from "../likes/like_interface_container";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const ChildComments = (props) => {
  const { comment, renderDelete, handleDelete } = props;

  return (
    <div className='comments__card'>
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
          {renderDelete(comment.commenterId) && (
            <button
              className='comments__delete'
              onClick={() => handleDelete(comment.id)}
            >
              DELETE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChildComments;
