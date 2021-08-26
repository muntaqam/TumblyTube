import React, { useState, useEffect, useRef } from "react";
import LikeInterface from "../likes/like_interface_container";
import CommentFormContainer from "./comment_form_container";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChildComments from "./comment_child";

function CommentIndex(props) {
  const {
    comments,
    currentVideoId,
    currentUser,
    fetchComments,
    deleteComment,
  } = props;
  const [toggled, setToggled] = useState(false);
  const childCommentRef = useRef(null);

  useEffect(() => {
    fetchComments(currentVideoId);
  }, [currentVideoId]);

  function toggle(type) {
    if (type == "reply" && toggled) setToggled(false);
    else setToggled(true);

    if (type == "cComments") childCommentRef.current.toggleComments();
  }

  function verifyUser(commenterId) {
    return commenterId === currentUser?.id;
  }

  function handleDelete(commentId) {
    deleteComment(commentId);
  }

  function renderDelete(commentId, commenterId) {
    let userVerified = verifyUser(commenterId);
    if (userVerified)
      return (
        <button
          className='comments__delete'
          onClick={() => handleDelete(commentId)}
        >
          DELETE
        </button>
      );
  }

  return (
    <div className='comments'>
      {comments.map((comment) => (
        <div className='comments__card' key={comment.id}>
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
              {renderDelete(comment.id, comment.commenterId)}
            </div>
            {toggled.reply ? (
              <CommentFormContainer
                parentCommentId={comment.id}
                currentVideoId={currentVideoId}
                toggleReply={() => toggle("reply")}
              />
            ) : null}
            <div
              className='comments__replies'
              onClick={() => toggle("cComments")}
            >
              {`⬇︎ View ${comment.numChildComments} replies`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default CommentIndex;
