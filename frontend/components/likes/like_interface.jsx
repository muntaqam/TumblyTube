import React, { useState, useEffect, useRef } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import Dropdown from "../dropdown/dropdown";
import { useHandleClickOutside } from "../../hooks/useHandleClickOutside";
import NotiPortal from "../noti_portal/noti_portal";

function LikeInterface(props) {
  const {
    likeableType,
    likeableId,
    numLikes,
    numDislikes,
    createLike,
    deleteLike,
    currentUser,
    currentUserId,
    dropdown,
    openDropdown,
    closeDropdown,
  } = props;

  const likeRef = useRef();
  const dislikeRef = useRef();
  const notiRef = useRef();
  const likesRatioRef = useRef();

  // 0 == no likes, 1 == liked, -1 == disliked
  const [likeStatus, setLikeStatus] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);

  // useHandleClickOutside({
  //   dropDownRef: dropdown === "like" ? likeRef : dislikeRef,
  //   showDropDown,
  //   setShowDropDown,
  // });

  // dispatch closeDropdown when !showDropdown
  // we dispatch it here because when there is a dropdown state, we want to close current dropdown and open a new one
  // useEffect(() => {
  //   if (!showDropDown) closeDropdown();
  // }, [showDropDown]);

  // check if newLike is already in users slice of state
  let isLiked;
  if (currentUserId) isLiked = currentUser[`liked${likeableType}s`][likeableId];

  const changeLikeStatus = (type) => {
    if (type === "like") setLikeStatus(1);
    if (type === "dislike") setLikeStatus(-1);
    if (type === "nolikes") setLikeStatus(0);
  };

  // if not liked and not logged in, set likeStatus to 0
  useEffect(() => {
    if (currentUserId && isLiked) changeLikeStatus(isLiked.version);
    else changeLikeStatus("nolikes");
  }, [props.match.params.id, currentUserId, likeableType]);

  const handleLikeBar = () => {
    let percentLikes = (numLikes / (numLikes + numDislikes)) * 100;
    if (numLikes === 0 && numDislikes === 0) percentLikes = 50;

    likesRatioRef.current.style.flexBasis = `${percentLikes}%`;
  };

  useEffect(() => {
    if (likeableType === "Video") handleLikeBar();
  }, [numLikes, numDislikes]);

  // calls addNoti from NotiPortal
  const addNoti = ({ mode, message }) => {
    notiRef.current.addMessage({ mode, message });
  };

  /////////////////////////
  // HANDLE LIKE BEGINS //
  ///////////////////////
  async function handleLike(version) {
    if (!currentUserId) {
      if (dropdown) {
        setShowDropDown(false);
        closeDropdown();
      } else {
        openDropdown(version);
        setShowDropDown(true);
      }
      return;
    }

    // set passed down properties to newLike obj for later use
    const newLike = {
      likeable_type: likeableType,
      likeable_id: likeableId,
      version: version,
    };

    if (isLiked && isLiked.version === version) {
      // deleteLike, if liked version and liking version is the same {eg: dislike == dislike}
      changeLikeStatus("nolikes");
      await deleteLike(isLiked.id);

      if (likeableType === "Video" && version === "like")
        addNoti({ mode: "success", message: "Removed from Liked videos" });
      if (likeableType === "Video" && version === "dislike")
        addNoti({ mode: "success", message: "Dislike removed" });

      return;
    }

    // deleteLike then createLike, if liked version and liking version isn't the same
    if (isLiked && isLiked.version != version) {
      await deleteLike(isLiked.id);
      await createLike(newLike);
      changeLikeStatus(version);

      if (likeableType === "Video" && version === "like")
        addNoti({ mode: "success", message: "Added to Liked videos" });
      if (likeableType === "Video" && version === "dislike")
        addNoti({ mode: "success", message: "Removed from Liked videos" });

      return;
    }

    // create new like, if not yet liked
    changeLikeStatus(version);
    await createLike(newLike);

    if (likeableType === "Video" && version === "like")
      addNoti({ mode: "success", message: "Added to Liked videos" });
    if (likeableType === "Video" && version === "dislike")
      addNoti({ mode: "success", message: "You Dislike this video" });
  }
  ///////////////////////
  // HANDLE LIKE ENDS //
  /////////////////////

  return (
    <div className='likes'>
      <div className='likes__buttons'>
        <div ref={likeRef} style={{ position: "relative" }}>
          <div
            className='likes__container likes__container--like'
            onClick={() => handleLike("like")}
          >
            {likeStatus == 1 ? (
              <ThumbUpIcon id='thumbup-icon' />
            ) : (
              <ThumbUpOutlinedIcon id='thumbup-icon' />
            )}
            <div className='thumb__num thumb__num--likes'>{numLikes}</div>
          </div>

          {showDropDown && dropdown === "like" ? <Dropdown /> : null}
        </div>

        <div ref={dislikeRef} style={{ position: "relative" }}>
          <div
            className='likes__container likes__container--dislike'
            onClick={() => handleLike("dislike")}
          >
            {likeStatus == -1 ? (
              <ThumbDownIcon id='thumbdown-icon' />
            ) : (
              <ThumbDownOutlinedIcon id='thumbdown-icon' />
            )}
            <div className='thumb__num thumb__num--dislikes'>{numDislikes}</div>
          </div>

          {showDropDown && dropdown === "dislike" ? <Dropdown /> : null}
        </div>
      </div>

      {likeableType == "Video" && (
        <div className='likes__bar'>
          <div
            className='likes__bar likes__bar--filled'
            ref={likesRatioRef}
          ></div>
        </div>
      )}

      {likeableType == "Video" && <NotiPortal ref={notiRef} autoClose={true} />}
    </div>
  );
}
export default LikeInterface;
