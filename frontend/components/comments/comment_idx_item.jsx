import React, { useState, useEffect } from "react";
import LikeInterface from "../likes/like_interface_container";
import CommentForm from "./comment_form_container";

function CommentIndexItem(props) {
  const { comment, currentVideoId, deleteComment, currentUser } = props;
  const [toggled, setToggled] = useState(false);

  function toggleReply() {
    toggled ? setToggled(false) : setToggled(true);
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
      return <button onClick={() => handleDelete(commentId)}>Delete</button>;
  };

  const renderComments = () => {
    if (!comment.parentCommentId) {
      return (
        <div>
          <div>{comment.username}</div>
          <div>{`${comment.commentedAt} ago`}</div>
          <div>{comment.body}</div>
          <div>
            <LikeInterface
              likeableId={comment.id}
              likeableType='Comment'
              numLikes={comment.numLikes}
              numDislikes={comment.numDislikes}
            />
          </div>
          <button onClick={toggleReply}>REPLY</button>
          {toggled ? (
            <CommentForm
              parentCommentId={comment.id}
              currentVideoId={currentVideoId}
              toggleReply={toggleReply}
            />
          ) : null}
          {renderDelete(comment.id, comment.commenterId)}
          <div>{`⬇︎ View ${comment.numChildComments} replies`}</div>
        </div>
      );
    }
  };

  const renderChildComments = () => {
    if (comment.parentCommentId) {
      return (
        <div>
          <div>{comment.username}</div>
          <div>{`${comment.commentedAt} ago`}</div>
          <div>{comment.body}</div>
          <div>
            <LikeInterface
              likeableId={comment.id}
              likeableType='Comment'
              numLikes={comment.numLikes}
              numDislikes={comment.numDislikes}
            />
          </div>
          {renderDelete(comment.id, comment.commenterId)}
        </div>
      );
    }
  };

  return (
    <div>
      {renderComments()}
      {renderChildComments()}
    </div>
  );
}

export default CommentIndexItem;
