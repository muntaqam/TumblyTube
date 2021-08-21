export const fetchVideos = (filter) => {
  return $.ajax({
    method: "GET",
    url: "/api/videos",
    data: { filter },
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

export const addViews = (videoId) => {
  return $.ajax({
    method: "POST",
    url: `/api/videos/${videoId}/add_views`,
  });
};
