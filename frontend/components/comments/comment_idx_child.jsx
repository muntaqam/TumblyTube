import React, { useState } from "react";
import LikeInterface from "../likes/like_interface_container";
import { avatarFromInitials } from "../../util/avatar_util";
import CommentFormContainer from "./comment_form/comment_form_container";

const ChildComments = (props) => {
  const { comment, userLoggedin, handleDelete, currentVideoId } = props;
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    setEditing(!editing);
  };

  return (
    <>
      {editing ? (
        <CommentFormContainer
          autoFocus={true}
          currentVideoId={currentVideoId}
          commentId={comment.id}
          toggleEditing={toggleEditing}
        />
      ) : (
        <div className='comments__card comments__card--child'>
          <div className='comments__usericon'>
            <img
              src={avatarFromInitials(comment.commenter, 24)}
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
              <LikeInterface
                likeableId={comment.id}
                likeableType='Comment'
                numLikes={comment.numLikes}
                numDislikes={comment.numDislikes}
              />
              {userLoggedin(comment.commenterId) && (
                <div>
                  <button
                    className='comments__delete'
                    onClick={() => handleDelete(comment.id)}
                  >
                    DELETE
                  </button>

                  <button className='comments__edit' onClick={toggleEditing}>
                    EDIT
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChildComments;
