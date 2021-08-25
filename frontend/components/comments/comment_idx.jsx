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
    <div className='comments'>
      {comments.map((comment) => (
        <CommentIndexItem
          key={comment.id}
          comment={comment}
          currentVideoId={currentVideoId}
          deleteComment={deleteComment}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}
export default CommentIndex;
