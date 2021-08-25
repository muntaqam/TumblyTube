import React, { useState, useEffect } from "react";
import LikeInterface from "../likes/like_interface_container";
import CommentFormContainer from "./comment_form_container";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function CommentIndexItem(props) {
  const { comment, currentVideoId, deleteComment, currentUser } = props;
  const [toggled, setToggled] = useState({ reply: false, cComments: false });

  function toggle(type) {
    toggled[type]
      ? setToggled((prevState) => ({ ...prevState, [type]: false }))
      : setToggled((prevState) => ({ ...prevState, [type]: true }));
  }

  function verifyUser(commenterId) {
    return commenterId === currentUser?.id;
  }

  function handleDelete(commentId) {
    deleteComment(commentId);
  }

  const renderDelete = (commentId, commenterId) => {
    let userVerified = verifyUser(commenterId);
    if (userVerified)
      return (
        <button
          className='comments__delete'
          onClick={() => handleDelete(commentId)}
        >
          Delete
        </button>
      );
  };

  const renderComments = () => {
    if (!comment.parentCommentId) {
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
              <button
                className='comments__reply'
                onClick={() => toggle("reply")}
              >
                REPLY
              </button>
            </div>
            {toggled.reply ? (
              <CommentFormContainer
                parentCommentId={comment.id}
                currentVideoId={currentVideoId}
                toggleReply={() => toggle("reply")}
              />
            ) : null}
            {renderDelete(comment.id, comment.commenterId)}
            <div
              className='comments__replies'
              onClick={() => toggle("cComments")}
            >{`⬇︎ View ${comment.numChildComments} replies`}</div>
          </div>
        </div>
      );
    }
  };

  const renderChildComments = () => {
    if (comment.parentCommentId)
      return (
        <div
          className={`comments__card comments__card--${
            toggled.cComments ? "" : "hidden"
          }`}
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
            </div>
            {renderDelete(comment.id, comment.commenterId)}
          </div>
        </div>
      );
  };

  return (
    <>
      {renderComments()}
      {renderChildComments()}
    </>
  );
}

export default CommentIndexItem;
