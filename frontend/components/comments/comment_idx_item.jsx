import React, { useState, useEffect } from "react";

function CommentIndexItem(props) {
  const { comment } = props;

  return (
    <div>
      <h3>●COMMENT●︎</h3>
      <div>{comment.username}</div>
      <div>{`${comment.commentedAt} ago`}</div>
      <div>{comment.body}</div>
      <div>{`⬇︎ View ${comment.numChildComments} replies`}</div>
      <ul>
        {comment.childComments.map((childComment) => (
          <li key={childComment.id}>
            <div>{comment.username}</div>
            <div>{`${comment.commentedAt} ago`}</div>
            {childComment.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentIndexItem;
