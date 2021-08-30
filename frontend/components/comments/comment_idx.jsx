import React, { useEffect, useState, useRef } from "react";
import ParentComments from "./comment_idx_item";

function CommentIndex(props) {
  const {
    comments,
    currentVideoId,
    currentUser,
    fetchMoreComments,
    deleteComment,
  } = props;

  // determines whether .bottomLoaderBar is seen or not
  const [showBottomBar, setShowBottomBar] = useState(true);

  // ensure comments length value in callback of Intersectional Observer is == comments.length
  const numComments = useRef(10);

  useEffect(() => {
    setShowBottomBar(true);
    numComments.current = comments.length;
  }, [comments.length]); //when new comments posted

  // INTRERSECTION OVSERVER
  const observer = React.useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        // fetchMoreComments returns length of newly fetched comments
        fetchMoreComments(currentVideoId, numComments.current, 10).then(
          (newCommentsLength) => {
            if (newCommentsLength <= 0) {
              setTimeout(() => {
                setShowBottomBar(false);
              }, 1500);
            }
          }
        );
      }
    }),
    { threshold: 1 }
  );

  // bottomLoaderBar state is set to .bottomLoaderBar JSX
  const [bottomLoaderBar, setBottomLoaderBar] = useState(null);

  useEffect(() => {
    const currentBottomLoaderBar = bottomLoaderBar;
    const currentObserver = observer.current;

    if (currentBottomLoaderBar) {
      currentObserver.observe(currentBottomLoaderBar);
    }

    return () => {
      if (currentBottomLoaderBar) {
        currentObserver.unobserve(currentBottomLoaderBar);
      }
    };
  }, [bottomLoaderBar]);

  return (
    <>
      {comments.length == 0 && (
        <div className='comments__empty'>No comments here :(</div>
      )}
      {comments.map((comment) => (
        <ParentComments
          key={comment.id}
          comment={comment}
          childComments={Object.values(comment.childComments)}
          currentVideoId={currentVideoId}
          currentUser={currentUser}
          deleteComment={deleteComment}
        />
      ))}
      {comments.length > 9 && showBottomBar ? (
        <div className='bottomLoaderBar' ref={setBottomLoaderBar}>
          <div className='loader'></div>
        </div>
      ) : null}
    </>
  );
}

export default CommentIndex;
