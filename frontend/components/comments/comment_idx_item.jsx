import React, { useState, useEffect, useRef, useContext } from "react";
import LikeInterface from "../likes/like_interface_container";
import CommentFormContainer from "./comment_form_container";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChildComments from "./comment_idx_child";

const toggleReply = React.createContext();

export function useOpenReply() {
  return useContext(toggleReply);
}

function CommentIndex(props) {
  const { comment, childComments, currentVideoId, currentUser, deleteComment } =
    props;

  const [openReply, setOpenReply] = useState(false);
  const [arrowUp, setArrowUp] = useState(false);

  const toggleOpenReply = () => {
    setOpenReply((prevState) => (prevState = !prevState));
  };

  const toggleArrow = () => {
    setArrowUp((prevState) => (prevState = !prevState));
  };

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
      <div className='comments__card'>
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
            <button className='comments__reply' onClick={toggleOpenReply}>
              REPLY
            </button>
            {renderDelete(comment.id, comment.commenterId)}
          </div>
          <toggleReply.Provider value={toggleOpenReply}>
            {openReply && (
              <CommentFormContainer
                autoFocus={true}
                currentVideoId={currentVideoId}
                parentCommentId={comment.id}
              />
            )}
          </toggleReply.Provider>
          {comment.numChildComments > 0 && (
            <div className='comments__replies' onClick={toggleArrow}>
              {arrowUp ? "▲ Hide" : "▼ View"}
              {`${comment.numChildComments} replies`}
            </div>
          )}
        </div>
      </div>
      {arrowUp &&
        childComments.map((comment) => (
          <ChildComments key={comment.id} comment={comment} />
        ))}
    </div>
  );
}
export default CommentIndex;
