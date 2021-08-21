import React from "react";
import VideoPlayer from "./video_player";
import SideVideoIndex from "./side_vid_idx";
import NavBar from "../main_page/nav_bar/nav_bar_container";
import CommentIndexContainer from "../comments/comment_idx_container";
import CommentFormContainer from "../comments/comment_form_container";
import LikeInterface from "../likes/like_interface_container";

class VideoShow extends React.Component {
  componentDidMount() {
    if (!this.props.videos.length) this.props.fetchVideos();
    this.props.addViews(this.props.currentVideoId);
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
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
      <div>
        <div className='main__top'>
          <NavBar />
        </div>
        <div>
          <div>
            <VideoPlayer
              video={this.props.currentVideo}
              videoId={this.props.currentVideoId}
            />
            <div>{this.props.currentVideo.title}</div>
            <div>
              <span>{this.props.currentVideo.views} views</span>
              <span>●</span>
              <span>{`${this.props.currentVideo.uploadedAt} ago`}</span>
              <LikeInterface
                likeableId={this.props.currentVideoId}
                likeableType='Video'
                numLikes={this.props.currentVideo.numLikes}
                numDislikes={this.props.currentVideo.numDislikes}
              />
              <div>Share</div>
            </div>
            <div>
              <div>
                <div>UserIcon</div>
                <div>
                  <div>{this.props.currentVideo.creator}</div>
                  <div>1.1k Subscribers</div>
                  <div>Subscribe</div>
                </div>
              </div>
              <div>{this.props.currentVideo.description}</div>
            </div>
            <CommentFormContainer currentVideoId={this.props.currentVideoId} />
            <CommentIndexContainer currentVideoId={this.props.currentVideoId} />
          </div>
          <div>{sideVideos}</div>
        </div>
      </div>
    );
  }
}

export default VideoShow;
