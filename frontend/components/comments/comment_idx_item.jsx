import React, { useState, useEffect } from "react";
import LikeInterface from "../likes/like_interface_container";
import CommentForm from "./comment_form_container";

function CommentIndexItem(props) {
  const { comment, currentVideoId, childComments, deleteComment, currentUser } =
    props;
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

  const renderChildComments = () => {
    return childComments.map((childComment) => (
      <li key={childComment.id}>
        <div>{childComment.username}</div>
        <div>{`${childComment.commentedAt} ago`}</div>
        <div>{childComment.body}</div>
        <div>{renderDelete(childComment.id, childComment.commenterId)}</div>
      </li>
    ));
  };

  return (
    <div>
      <h3>●COMMENT●︎</h3>
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

      <ul>{childComments ? renderChildComments() : null}</ul>
    </div>
  );
}

export default CommentIndexItem;
