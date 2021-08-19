import React from "react";
import VideoPlayer from "./video_player";
import SideVideoIndex from "./side_vid_idx";
import NavBar from "../main_page/nav_bar/nav_bar_container";
import CommentIndexContainer from "../comments/comment_idx_container";
import CommentFormContainer from "../comments/comment_form_container";
import LikeInterface from "../likes/like_interface_container";

class VideoShow extends React.Component {
  componentDidMount() {
    this.props.fetchVideos();
    this.props.fetchComments(this.props.currentVideoId);
  }

  // componentDidUpdate() {
  //   this.props.fetchComments(this.props.currentVideoId);
  // }

  render() {
    if (!this.props.currentVideo) return null;
    let sideVideos = Object.values(this.props.videos).map((vid) => {
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
              {`${this.props.currentVideo.uploadedAt} ago`}
              <LikeInterface
                likeableId={this.props.currentVideoId}
                likeableType='Video'
                numLikes={this.props.currentVideo.numLikes}
                numDislikes={this.props.currentVideo.numDislikes}
              />
              <div>Like Dislike Share</div>
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
            <CommentFormContainer />
            <CommentIndexContainer />
          </div>
          <div>{sideVideos}</div>
        </div>
      </div>
    );
  }
}

export default VideoShow;
