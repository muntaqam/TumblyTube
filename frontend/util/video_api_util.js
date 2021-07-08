export const fetchVideos = () => {
  return $.ajax({
    method: "GET",
    url: "/api/videos",
  });
};

export const fetchVideo = (vidId) => {
  return $.ajax({
    method: "GET",
    url: `/api/videos/${vidId}`,
  });
};

export const createVideo = (formData) => {
  return $.ajax({
    method: "POST",
    url: "/api/videos",
    data: formData,
    contentType: false,
    processData: false,
  });
};

export const deleteVideo = (videoId) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/videos/${videoId}`,
  });
};
