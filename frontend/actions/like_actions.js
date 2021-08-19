import * as APIUtil from "../util/like_api_util";

export const RECEIVE_VIDEO_LIKE = "RECEIVE_VIDEO_LIKE";
export const RECEIVE_COMMENT_LIKE = "RECEIVE_COMMENT_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

const receiveVideoLike = (like) => ({
  type: RECEIVE_VIDEO_LIKE,
  like,
  version: like.version,
  videoId: like.likeableId,
  likerId: like.likerId,
});

const receiveCommentLike = (like) => ({
  type: RECEIVE_COMMENT_LIKE,
  like,
  version: like.version,
  commentId: like.likeableId,
  likerId: like.likerId,
});

const removeLike = (like) => ({
  type: REMOVE_LIKE,
  like,
  version: like.version,
  likerId: like.likerId,
  likeableType: like.likeableType,
  likeableId: like.likeableId,
});

export const createLike = (like) => (dispatch) => {
  return APIUtil.createLike(like).then((like) => {
    if (like.likeableType == "Video") dispatch(receiveVideoLike(like));
    if (like.likeableType == "Comment") dispatch(receiveCommentLike(like));
  });
};

export const deleteLike = (likeId) => (dispatch) => {
  return APIUtil.deleteLike(likeId).then((like) => dispatch(removeLike(like)));
};
