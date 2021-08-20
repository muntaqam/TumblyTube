import React, { useState, useEffect } from "react";
import CommentIndexItem from "./comment_idx_item";

function CommentIndex(props) {
  const {
    comments,
    currentVideoId,
    fetchComments,
    deleteComment,
    currentUser,
  } = props;

  useEffect(() => {
    fetchComments(currentVideoId);
  }, [currentVideoId]);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentIndexItem
            comment={comment}
            currentVideoId={currentVideoId}
            deleteComment={deleteComment}
            currentUser={currentUser}
          />
        </li>
      ))}
    </ul>
  );
}
export default CommentIndex;
