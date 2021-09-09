import React from "react";
import VideoPlayer from "./video_player";
import { avatarFromInitials } from "../../util/avatar_util";
import SubscribeButtonContainer from "../subscribe_button/subscribe_btn_container";
import LikeInterface from "../likes/like_interface_container";
import CommentIndexContainer from "../comments/comment_idx_container";
import CommentFormContainer from "../comments/comment_form_container";
import SideVideoIndex from "./side_vid_idx";

class VideoShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };

    this.toggleShowMore = this.toggleShowMore.bind(this);
  }

  componentDidMount() {
    // if no videos, fetchVideos and +1 views to currentVideoId
    // if videos, +1 views to currentVideoId
    if (!this.props.videos.length)
      this.props.fetchVideos(this.props.currentVideoId);
    else this.props.addViews(this.props.currentVideoId);

    this.props.fetchComments(this.props.currentVideoId, 10);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentVideoId !== this.props.currentVideoId) {
      this.props.addViews(this.props.currentVideoId);
      this.props.fetchComments(this.props.currentVideoId, 10);
    }
  }

  toggleShowMore() {
    if (this.state.showMore) this.setState({ showMore: false });
    else this.setState({ showMore: true });
  }

  render() {
    if (!this.props.currentVideo) return null;

    const { currentVideo, currentVideoId, currentUserId } = this.props;
    const creator = currentVideo.creator;
    const currentVidDesc = currentVideo.description;
    const { showMore } = this.state;

    let sideVideos = this.props.videos.map((vid) => {
      if (vid.id != currentVideoId) {
        return (
          <SideVideoIndex key={vid.id} video={vid} creator={vid.creator} />
        );
      }
    });

    return (
      <div className='vshow'>
        <div className='vshow__split vshow__split--meta'>
          <VideoPlayer video={currentVideo} videoId={currentVideoId} />
          <div className='vdetails'>
            <div className='vdetails__title'>{currentVideo.title}</div>
            <div className='vdetails vdetails--split'>
              <div className='vdetails__viewsdate'>
                {currentVideo.views} views
                <span className='vdetails__dot'>●</span>
                {currentVideo.uploadedAt} ago
              </div>
              <div className='vdetails__interface'>
                <LikeInterface
                  likeableId={currentVideoId}
                  likeableType='Video'
                  numLikes={currentVideo.numLikes}
                  numDislikes={currentVideo.numDislikes}
                />
                <div className='vdetails__item vdetails__item--share'>
                  SHARE
                </div>
              </div>
            </div>
          </div>
          <div className='vdesc'>
            <div className='vdesc__split vdesc__split--left'>
              <div className='vdesc__usericon'>
                <img
                  src={avatarFromInitials(creator, 48)}
                  alt='avatar'
                  className='vdesc__user'
                />
              </div>
            </div>
            <div className='vdesc__split vdesc__split--right'>
              <div className='vdesc__top'>
                <div className='vdesc__top vdesc__top--split'>
                  <div className='vdesc__top vdesc__top--left'>
                    <div className='vdesc__username'>{creator.username}</div>
                    <div className='vdesc__subcount'>
                      {creator.numSubscribers} Subscribers
                    </div>
                  </div>
                  {currentUserId != creator.id && (
                    <SubscribeButtonContainer creator={creator} />
                  )}
                </div>
              </div>
              <div className='vdesc__expandable'>
                {currentVidDesc.substring(0, this.strIndex())}
                <span
                  className={`vdesc__hide vdesc__hide--${
                    showMore ? "" : "hidden"
                  }`}
                >
                  {currentVidDesc.substring(this.strIndex() + 1)}
                </span>
              </div>
              <div
                className={`vdesc__showmore vdesc__showmore--${
                  currentVidDesc.length < 200 ? "hidden" : ""
                }`}
                onClick={this.toggleShowMore}
              >
                SHOW {showMore ? " LESS" : " MORE"}
              </div>
            </div>
          </div>
        </div>
        <div className='vshow__split vshow__split--comments'>
          <div className='vshow__numComments'>{`${currentVideo.numComments} Comments`}</div>
          <CommentFormContainer
            currentVideoId={currentVideoId}
            autoFocus={false}
          />
          <div className='comments'>
            <CommentIndexContainer currentVideoId={currentVideoId} />
          </div>
        </div>
        <div className='vshow__split vshow__split--sideidx'>
          <div className='sideidx'>{sideVideos}</div>
        </div>
      </div>
    );
  }

  strIndex() {
    const rawStr = String.raw`${this.props.currentVideo.description}`;
    const newLineIdx = rawStr.indexOf("\n");
    const maxChars = 200;

    if (newLineIdx <= 0) return maxChars;

    if (newLineIdx < 200) return newLineIdx;
    else return maxChars;
  }
}

export default VideoShow;
