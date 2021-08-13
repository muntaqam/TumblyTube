import React, { useState, useEffect } from "react";
import CommentIndexItem from "./comment_idx_item";

function CommentIndex(props) {
  const { comments, deleteComment, currentUser } = props;

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentIndexItem
            comment={comment}
            childComments={
              comment.childComments ? Object.values(comment.childComments) : []
            }
            deleteComment={deleteComment}
            currentUser={currentUser}
          />
        </li>
      ))}
    </ul>
  );
}
export default CommentIndex;
