import React, { useState, useRef } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { avatarFromInitials } from "../../../util/avatar_util";

const CommentForm = (props) => {
  const {
    currentUser,
    currentUserId,
    currentVideoId,
    createComment,
    editComment,
    toggleOpenReply,
    toggleEditing,
    message,
    commentId,
    parentCommentId,
    autoFocus,
  } = props;

  const [body, setBody] = useState(message || "");
  const [showInputLine, setInputLine] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [showBtn, setShowBtn] = useState(false);

  const inputRef = useRef(null);

  function handleFocus() {
    if (!currentUser) props.history.push("/login");
    else {
      setShowBtn(true);
      setInputLine(true);
    }
  }

  function handleInput(e) {
    setBody(e.currentTarget.value);
    if (!e.currentTarget.value) setDisabledBtn(true);
    else setDisabledBtn(false);
  }

  function handleSubmit(e) {
    // EDIT
    if (commentId) {
      editComment(commentId, {
        body,
        commenter_id: currentUser.id,
        video_id: currentVideoId,
      });
      toggleEditing();
      return;
    }

    createComment({
      body,
      commenter_id: currentUser.id,
      video_id: currentVideoId,
      parent_comment_id: parentCommentId,
    });
    setBody("");
    if (parentCommentId) toggleOpenReply();
  }

  function handleCancel(e) {
    e.preventDefault();
    if (parentCommentId) toggleOpenReply();
    if (commentId) toggleEditing();
    setBody("");
    setShowBtn(false);
    setDisabledBtn(true);
  }

  let buttonName;
  if (commentId) {
    buttonName = "SAVE";
  } else if (parentCommentId) {
    buttonName = "REPLY";
  } else {
    buttonName = "COMMENT";
  }

  return (
    <div className='cmtform'>
      <div className='cmtform__icon'>
        {currentUserId ? (
          <img
            src={avatarFromInitials(currentUser, 40)}
            alt='avatar'
            className='cmtform__user'
          />
        ) : (
          <AccountCircleIcon id='form-signin-button' />
        )}
      </div>
      <div className='cmtform__form'>
        <section className='cmtform__inputBox'>
          <input
            className='cmtform__input'
            ref={inputRef}
            type='text'
            placeholder={`Add a public ${
              parentCommentId ? "reply" : "comment"
            }...`}
            value={body}
            onChange={handleInput}
            onFocus={handleFocus}
            onBlur={() => setInputLine(false)}
            autoFocus={autoFocus}
          />
          {showInputLine && <div className='cmtform__inputLine'></div>}
        </section>
        {showBtn && (
          <div className={`cmtform__buttons`}>
            <button className='cmtform__cancel' onClick={handleCancel}>
              CANCEL
            </button>
            <button
              className={`cmtform__submit cmtform__submit--${
                disabledBtn ? "inactive" : ""
              }`}
              disabled={disabledBtn}
              onClick={handleSubmit}
            >
              {buttonName}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
