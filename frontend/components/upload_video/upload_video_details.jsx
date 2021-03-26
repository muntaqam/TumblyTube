import React from "react";

export default class UploadVideoDetails extends React.Component {
  render() {
    return (
      <main id="upload-video-form-container">
        <header id="upload-video-details">
          <span>{this.state.title}</span>
          <div>
            <i className="fas fa-exclamation-triangle"></i>
            <i onClick={this.props.closeModal} className="fas fa-times"></i>
          </div>
        </header>

        <div id="line-container">
          <div id="circle-details-container">
            <p className="strong-p">Details</p>
            <div id="circle-details"></div>
          </div>
          <div id="circle-elements-container">
            <p className="strong-p">Elements</p>
            <div id="circle-elements"></div>
          </div>
          <div id="circle-visibility-container">
            <p className="strong-p">Visibility</p>
            <div id="circle-visibility"></div>
          </div>
        </div>

        <div id="line"></div>

        <h1>Details</h1>

        <div id="video-details-form-container">
          <form>
            <input
              type="text"
              id="video-upload-title-input"
              onChange={this.handleChange("title")}
              value={this.state.title}
              placeholder="Add a title that describes your video"
              required
            />
            <label id="video-upload-title-label">Title (required)</label>
            <textarea
              cols="30"
              rows="10"
              onChange={this.handleChange("description")}
              value={this.state.description}
              placeholder="Tell viewers about your video"
            ></textarea>
            <label id="video-upload-description-label">Description</label>
          </form>
          <div id="video-upload-preview-container">
            <video height="170" width="303" controls>
              <source src={this.state.videoUrl} type="video/mp4" />
              <source src={this.state.videoUrl} type="video/ogg" />
              <source src={this.state.videoUrl} type="video/webm" />
              There was a problem rendering the video
            </video>
            <div id="video-upload-preview-details-container">
              <div id="video-preview-link-container">
                <div>
                  <label>Video Link</label>
                  <a>Availble after successful upload</a>
                </div>
                <i className="far fa-copy"></i>
              </div>
              <div id="video-preview-filename-container">
                <div>
                  <label>Filename</label>
                  <p className="strong-p">{fileName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <div>
            <i className="fab fa-js-square"></i>
            <p className="weak-p">Finished processing</p>
          </div>
          <button id="upload-video-submit-btn" onClick={this.handleSubmit}>
            {this.props.formType}
          </button>
        </footer>
      </main>
    );
  }
}
