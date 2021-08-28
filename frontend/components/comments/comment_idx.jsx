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
  const [numComments, setNumComments] = useState(10);

  useEffect(() => {
    setShowBottomBar(true);
    setNumComments(comments.length);
  }, [comments.length]); //when new comments posted

  console.log("top" + " " + numComments);

  // INTRERSECTION OVSERVER
  const observer = React.useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        fetchMoreComments(currentVideoId, numComments, 10).then(
          (newComments) => {
            if (Object.keys(newComments) > 0) {
              setTimeout(() => {}, 6000);
            } else {
              setTimeout(() => {
                setShowBottomBar(false);
              }, 3000);
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
