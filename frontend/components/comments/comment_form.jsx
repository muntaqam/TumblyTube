import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function CommentForm(props) {
  const { currentUser, currentVideoId, createComment } = props;
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
    });
    setBody("");
    setDisabled(true);
  }

  function handleCancel(e) {
    e.preventDefault();
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
            placeholder='Add a public comment...'
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
            COMMENT
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
