import * as APIUtil from "../util/like_api_util";

export const RECEIVE_VIDEO_LIKE = "RECEIVE_VIDEO_LIKE";
export const RECEIVE_COMMENT_LIKE = "RECEIVE_COMMENT_LIKE";
export const RECEIVE_CHILD_COMMENT_LIKE = "RECEIVE_CHILD_COMMENT_LIKE";
export const REMOVE_VIDEO_LIKE = "REMOVE_VIDEO_LIKE";
export const REMOVE_COMMENT_LIKE = "REMOVE_COMMENT_LIKE";
export const REMOVE_CHILD_COMMENT_LIKE = "REMOVE_CHILD_COMMENT_LIKE";

const receiveVideoLike = (like) => ({
  type: RECEIVE_VIDEO_LIKE,
  like,
  version: like.version,
  videoId: like.likeableId,
  likerId: like.likerId,
});

const removeVideoLike = (like) => ({
  type: REMOVE_VIDEO_LIKE,
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

const receiveChildCommentLike = (like) => ({
  type: RECEIVE_CHILD_COMMENT_LIKE,
  like,
  version: like.version,
  commentId: like.likeableId,
  likerId: like.likerId,
  parentCommentId: like.parentCommentId,
});

const removeCommentLike = (like) => ({
  type: REMOVE_COMMENT_LIKE,
  like,
  version: like.version,
  commentId: like.likeableId,
  likerId: like.likerId,
});

const removeChildCommentLike = (like) => ({
  type: REMOVE_CHILD_COMMENT_LIKE,
  like,
  version: like.version,
  commentId: like.likeableId,
  likerId: like.likerId,
  parentCommentId: like.parentCommentId,
});

export const createLike = (like) => (dispatch) => {
  return APIUtil.createLike(like).then((like) => {
    if (like.likeableType == "Video") dispatch(receiveVideoLike(like));

    if (like.likeableType == "Comment" && like.parentCommentId) {
      dispatch(receiveChildCommentLike(like));
    } else if (like.parentCommentId) {
      dispatch(receiveCommentLike(like));
    }
  });
};

export const deleteLike = (likeId) => (dispatch) => {
  return APIUtil.deleteLike(likeId).then((like) => {
    if (like.likeableType == "Video") dispatch(removeVideoLike(like));

    if (like.likeableType == "Comment" && like.parentCommentId) {
      dispatch(removeChildCommentLike(like));
    } else if (like.parentCommentId) {
      dispatch(removeCommentLike(like));
    }
  });
};
