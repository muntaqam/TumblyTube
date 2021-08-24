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
    <>
      {comments.map((comment) => (
        <div className="comments" key={comment.id}>
          <CommentIndexItem
            comment={comment}
            currentVideoId={currentVideoId}
            deleteComment={deleteComment}
            currentUser={currentUser}
          />
        </div>
      ))}
    </>
  );
}
export default CommentIndex;
