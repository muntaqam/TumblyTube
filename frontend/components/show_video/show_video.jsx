import React from "react";
import VideoPlayer from "./video_player";
import SideVideoIndex from "./side_vid_idx";
import CommentIndexContainer from "../comments/comment_idx_container";
import CommentFormContainer from "../comments/comment_form_container";
import LikeInterface from "../likes/like_interface_container";

class VideoShow extends React.Component {
  componentDidMount() {
    if (!this.props.videos.length) this.props.fetchVideos();
    this.props.addViews(this.props.currentVideoId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentVideoId !== this.props.currentVideoId) {
      this.props.addViews(this.props.currentVideoId);
    }
  }

  render() {
    if (!this.props.currentVideo) return null;

    let sideVideos = this.props.videos.map((vid) => {
      if (vid.id != this.props.currentVideoId) {
        return <SideVideoIndex key={vid.id} video={vid} />;
      }
    });

    return (
      <div className='vshow'>
        <div className='vshow vshow--split'>
          <VideoPlayer
            video={this.props.currentVideo}
            videoId={this.props.currentVideoId}
          />
          <div className='vdetails'>
            <div className='vdetails__title'>
              {this.props.currentVideo.title}
            </div>
            <div className='vdetails vdetails--split'>
              <div className='vdetails__viewsdate'>
                {this.props.currentVideo.views} views
                <span>●</span>
                {this.props.currentVideo.uploadedAt} ago
              </div>
              <div className='vdetails__interface'>
                <LikeInterface
                  likeableId={this.props.currentVideoId}
                  likeableType='Video'
                  numLikes={this.props.currentVideo.numLikes}
                  numDislikes={this.props.currentVideo.numDislikes}
                />
                <div className='vdetails__share'>Share</div>
              </div>
            </div>
          </div>
          <div className='vdesc'>
            <div className='vdesc__top'>
              <div className='vdesc__top vdesc__top--split'>
                <div className='vdesc__top vdesc__top--left'>
                  <div className='vdesc__username'>
                    {this.props.currentVideo.creator}
                  </div>
                  <div className='vdesc__subcount'>1.1k Subscribers</div>
                </div>
                <div className='vdesc__top vdesc__top--right'>
                  <div className='vdesc__subscribe'>Subscribe</div>
                </div>
              </div>
            </div>
            <div className='vdesc__body'>
              {this.props.currentVideo.description}
            </div>
          </div>
          <CommentFormContainer currentVideoId={this.props.currentVideoId} />
          <CommentIndexContainer currentVideoId={this.props.currentVideoId} />
        </div>
        {sideVideos}
      </div>
    );
  }
}

export default VideoShow;
