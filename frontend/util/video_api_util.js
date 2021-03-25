export const fetchVideos = () => {
  $.ajax({
    method: "GET",
    url: "/api/videos",
  });
};

export const fetchVideo = (vidId) => {
  $.ajax({
    method: "GET",
    url: `/api/videos/${vidId}`,
  });
};

export const createVideo = (inputData) => {
  $.ajax({
    method: "POST",
    url: "/api/videos",
    data: inputData,
  });
};

export const deleteVideo = (videoId) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/videos/${videoId}`,
  });
};
