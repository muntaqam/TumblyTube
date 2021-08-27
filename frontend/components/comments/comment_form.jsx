import React, { useState, useRef } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useOpenReply } from "./comment_idx_item";

function CommentForm(props) {
  const {
    currentUser,
    currentVideoId,
    createComment,
    parentCommentId,
    autoFocus,
  } = props;

  const [body, setBody] = useState("");
  const [showInputLine, setInputLine] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [showBtn, setShowBtn] = useState(false);
  const inputRef = useRef(null);

  // custom hook to toggle CommentForm in CommentIdx
  const toggleOpenReply = useOpenReply();

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
    e.preventDefault();
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
              {parentCommentId ? "REPLY" : "COMMENT"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentForm;
