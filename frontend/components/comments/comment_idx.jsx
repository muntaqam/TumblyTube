import React, { useEffect } from "react";
import ParentComments from "./comment_idx_item";

function CommentIndex(props) {
  const {
    comments,
    currentVideoId,
    currentUser,
    fetchComments,
    deleteComment,
  } = props;

  useEffect(() => {
    fetchComments(currentVideoId);
  }, [currentVideoId]);

  return (
    <>
      {comments.map((comment) => (
        <ParentComments
          key={comment.id}
          comment={comment}
          childComments={Object.values(comment.childComments)}
          currentVideoId={currentVideoId}
          currentUser={currentUser}
          deleteComment={deleteComment}
        />
      ))}
    </>
  );
}

export default CommentIndex;
