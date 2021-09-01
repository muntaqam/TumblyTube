import React from "react";
import { Link } from "react-router-dom";

function SideVideoIndex(props) {
  const { video } = props;

  function handleMouseEnter(e) {
    e.target.play();
  }

  function handleMouseOut(e) {
    e.target.currentTime = 0;
    e.target.pause();
  }

  const viewsFormatted = () => {
    const views = video.views;

    if (views < 999) return views;

    if (views >= 1000) {
      let dividedT = views / 1000;
      if (dividedT > Math.floor(dividedT)) {
        return `${dividedT.toFixed(1)}K`;
      } else {
        // no decimals if dividedThousands is a whole num
        return `${dividedT}K`;
      }
    }

    if (views >= 1000000) {
      let dividedM = views / 1000000;
      if (dividedM > Math.floor(dividedM)) {
        return `${dividedM.toFixed(1)}M`;
      } else {
        // no decimals if dividedMillions is a whole num
        return `${dividedM}M`;
      }
    }
  };

  return (
    <Link className='sideidx__card' to={`/watch/${video.id}`}>
      <video
        className='sideidx__vid'
        muted
        src={video.videoUrl}
        onMouseEnter={handleMouseEnter}
        onMouseOut={handleMouseOut}
      ></video>
      <div className='sideidx__desc'>
        <div className='sideidx__title'>{video.title}</div>
        <div className='sideidx__username'>{video.username}</div>
        <div className='sideidx__viewsdate'>
          {viewsFormatted()} views
          <span className='sideidx__dot'>●</span>
          {video.uploadedAt} ago
        </div>
      </div>
    </Link>
  );
}

export default SideVideoIndex;
