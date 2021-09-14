import React, { useState, useEffect, useRef, useContext } from "react";
import LikeInterface from "../likes/like_interface_container";
import CommentFormContainer from "./comment_form/comment_form_container";
import { avatarFromInitials } from "../../util/avatar_util";
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

  const verifyUser = (commenterId) => {
    return commenterId === currentUser?.id;
  };

  const handleDelete = (commentId) => {
    deleteComment(commentId);
  };

  const renderDelete = (commenterId) => {
    let userVerified = verifyUser(commenterId);
    if (userVerified) return true;
    else false;
  };

  return (
    <div className='comments__card'>
      <div className='comments__usericon'>
        <img
          src={avatarFromInitials(comment.commenter, 40)}
          alt='avatar'
          className='comments__user'
        />
      </div>
      <div className='comments__details'>
        <div className='comments__username'>
          {comment.commenter.username}{" "}
          <span className='comments__date'>{`${comment.commentedAt} ago`}</span>
        </div>
        <div className='comments__body'>{comment.body}</div>
        <div className='comments__interface'>
          {/* <LikeInterface
            likeableId={comment.id}
            likeableType='Comment'
            numLikes={comment.numLikes}
            numDislikes={comment.numDislikes}
          /> */}
          <button className='comments__reply' onClick={toggleOpenReply}>
            REPLY
          </button>
          {renderDelete(comment.commenterId) && (
            <button
              className='comments__delete'
              onClick={() => handleDelete(comment.id)}
            >
              DELETE
            </button>
          )}
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
            {arrowUp ? "▲ Hide " : "▼ View "}
            {`${comment.numChildComments} replies`}
          </div>
        )}
        {arrowUp &&
          childComments.map((comment) => (
            <ChildComments
              key={comment.id}
              comment={comment}
              handleDelete={handleDelete}
              renderDelete={renderDelete}
            />
          ))}
      </div>
    </div>
  );
}
export default CommentIndex;
