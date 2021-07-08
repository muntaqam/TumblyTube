import * as APIUtilVid from "../util/video_api_util";

export const RECEIVE_VIDEOS = "RECEIVE_VIDEOS";
export const RECEIVE_VIDEO = "RECEIVE_VIDEO";
export const REMOVE_VIDEO = "REMOVE_VIDEO";
export const RECEIVE_VIDEO_ERRORS = "RECEIVE_VIDEO_ERRORS";
export const CLEAR_VIDEO_ERRORS = "CLEAR_VIDEO_ERRORS";

//sync
const receiveVideos = (videos) => ({
  type: RECEIVE_VIDEOS,
  videos,
});

const receiveVideo = (video) => ({
  type: RECEIVE_VIDEO,
  video,
});

const receiveVideoErrors = (errors) => ({
  type: RECEIVE_VIDEO_ERRORS,
  errors,
});

const destroyVideo = (videoId) => {
  return {
    type: REMOVE_VIDEO,
    videoId,
  };
};

export const clearVideoErrors = () => ({
  type: CLEAR_VIDEO_ERRORS,
});

//async
export const fetchVideos = () => (dispatch) => {
  return APIUtilVid.fetchVideos().then((videos) =>
    dispatch(receiveVideos(videos))
  );
};

export const fetchVideo = (vidId) => (dispatch) =>
  APIUtilVid.fetchVideo(vidId).then((video) => dispatch(receiveVideo(video)));

export const createVideo = (video) => (dispatch) =>
  APIUtilVid.createVideo(video).then(
    (video) => dispatch(receiveVideo(video)),
    (errors) => dispatch(receiveVideoErrors(errors.responseJSON))
  );

export const deleteVideo = (videoId) => (dispatch) => {
  return APIUtilVid.deleteVideo(videoId).then(
    dispatch(destroyVideo(videoId)),
    (errors) => dispatch(receiveVideoErrors(errors))
  );
};
