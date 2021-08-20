import React, { useState, useEffect } from "react";
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
  const [disabled, setDisabled] = useState(true);

  function requireLogin() {
    if (!currentUser) {
      props.history.push("/login");
    }
  }

  function handleInput(e) {
    setBody(e.currentTarget.value);
    if (!e.currentTarget.value) setDisabled(true);
    setDisabled(false);
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
    setDisabled(true);
    if (parentCommentId) toggleReply();
  }

  function handleCancel(e) {
    e.preventDefault();
    if (parentCommentId) toggleReply();
    setBody("");
    setDisabled(true);
  }

  return (
    <div>
      {currentUser ? (
        <div>{currentUser.username[0].toUpperCase()}</div>
      ) : (
        <div>
          <AccountCircleIcon />
        </div>
      )}
      <div>
        <div>
          <input
            type='text'
            placeholder={`Add a public ${
              parentCommentId ? "reply" : "comment"
            }...`}
            value={body}
            onChange={handleInput}
            onFocus={requireLogin}
          />
        </div>
        <div>
          <button className='comment__button' onClick={handleCancel}>
            CANCEL
          </button>
          <button
            className={`comment__button ${disabled ? "hidden" : ""}`}
            onClick={handleSubmit}
          >
            {parentCommentId ? "REPLY" : "COMMENT"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
