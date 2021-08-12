import React, { useState, useEffect } from "react";
import CommentForm from "./comment_form_container";

function CommentIndexItem(props) {
  const { comment, deleteComment, currentUser } = props;
  const [toggled, setToggled] = useState(false);

  function toggleReply() {
    toggled ? setToggled(false) : setToggled(true);
  }

  function verifyUser() {
    return comment.commenter_id === currentUser.id;
  }

  function handleDelete(commentId) {
    deleteComment(commentId);
  }

  const renderDelete = (commentId) => {
    let userVerified = verifyUser();
    if (userVerified)
      return <button onClick={() => handleDelete(commentId)}>Delete</button>;
  };

  return (
    <div>
      <h3>●COMMENT●︎</h3>
      <div>{comment.username}</div>
      <div>{`${comment.commentedAt} ago`}</div>
      <div>{comment.body}</div>
      <button onClick={toggleReply}>REPLY</button>
      {toggled ? (
        <CommentForm parentCommentId={comment.id} toggleReply={toggleReply} />
      ) : null}
      {renderDelete(comment.id)}
      <div>{`⬇︎ View ${comment.numChildComments} replies`}</div>
      <ul>
        {comment.childComments.map((childComment) => (
          <li key={childComment.id}>
            <div>{childComment.username}</div>
            <div>{`${childComment.commentedAt} ago`}</div>
            {childComment.body}
            <div>{renderDelete(childComment.id)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentIndexItem;
