export const fetchComments = (vidId) => {
  return $.ajax({
    method: "GET",
    url: `api/videos/${vidId}/comments`,
  });
};

export const createComment = (comment) => {
  return $.ajax({
    method: "POST",
    url: "api/comments",
    data: { comment },
  });
};

export const deleteComment = (commentId) => {
  return $.ajax({
    method: "DELETE",
    url: `api/comments/${commentId}`,
  });
};
