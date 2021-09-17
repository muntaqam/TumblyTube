export const fetchComments = (vidId, numLimit) => {
  return $.ajax({
    method: "GET",
    url: `api/videos/${vidId}/comments`,
    data: { numLimit },
  });
};

export const fetchMoreComments = (vidId, numOffset, numLimit) => {
  return $.ajax({
    method: "POST",
    url: `api/videos/${vidId}/more_comments`,
    data: {
      numOffset: numOffset,
      numLimit: numLimit,
    },
  });
};

export const createComment = (comment) => {
  return $.ajax({
    method: "POST",
    url: "api/comments",
    data: { comment },
  });
};

export const editComment = (commentId, comment) => {
  return $.ajax({
    method: "PATCH",
    url: `api/comments/${commentId}`,
    data: { comment },
  });
};

export const deleteComment = (commentId) => {
  return $.ajax({
    method: "DELETE",
    url: `api/comments/${commentId}`,
  });
};
