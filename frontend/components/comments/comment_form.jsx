import React, { useState, useRef } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function CommentForm(props) {
  const {
    currentUser,
    currentVideoId,
    createComment,
    parentCommentId,
    toggleReply,
  } = props;
  const [body, setBody] = useState("");
  const [showInputLine, setInputLine] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [showBtn, setShowBtn] = useState(false);
  const inputRef = useRef(null);

  function requireLogin() {
    if (!currentUser) props.history.push("/login");
    else setShowBtn(true);
  }

  function handleInput(e) {
    setBody(e.currentTarget.value);
    if (!e.currentTarget.value) setDisabledBtn(true);
    else setDisabledBtn(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    createComment({
      body,
      commenter_id: currentUser.id,
      video_id: currentVideoId,
      parent_comment_id: parentCommentId,
    });
    setBody("");
    setDisabledBtn(true);
    if (parentCommentId) toggleReply();
  }

  function handleCancel(e) {
    e.preventDefault();
    if (parentCommentId) toggleReply();
    setBody("");
    setShowBtn(false);
    setDisabledBtn(true);
  }

  return (
    <div className='cmtform'>
      <div className='comments__icon'>
        <AccountCircleIcon />
      </div>
      <div className='cmtform__form'>
        <input
          className='cmtform__input'
          ref={inputRef}
          type='text'
          placeholder={`Add a public ${
            parentCommentId ? "reply" : "comment"
          }...`}
          value={body}
          onChange={handleInput}
          onFocus={requireLogin}
        />
        {showBtn && (
          <div className={`cmtform__buttons cmtform__button--${showInputLine}`}>
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
              {parentCommentId ? "REPLY" : "COMMENT"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentForm;
