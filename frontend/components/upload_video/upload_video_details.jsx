import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import PublishIcon from "@material-ui/icons/Publish";
import Tooltip from "../tooltip/tooltip";

export default class UploadVideoDetails extends React.Component {
  disableBtn() {
    if (this.props.title.length === 0 || !/\S/.test(this.props.title)) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className='vid-upload' onClick={(e) => e.stopPropagation()}>
        <header className='vid-upload__header'>
          <span className='vid-upload__header__title '>{this.props.title}</span>

          <div className='vid-upload__header__btns'>
            <Tooltip content='discard and close'>
              <CloseIcon
                id='upload-close-btn'
                onClick={this.props.closeModal}
              />
            </Tooltip>
          </div>
        </header>
        <section className='uploadDetails'>
          <section className='uploadDetails__split uploadDetails__split--left'>
            <div className='uploadDetails__header'>Details</div>
            <div className='uploadDetails__textarea uploadDetails__textarea--title'>
              <input
                type='text'
                id='uploadDetails-titleInput'
                value={this.props.title}
                onChange={this.props.handleChange("title")}
                className='uploadDetails__input uploadDetails__input--title'
                placeholder='Add a title that describes your video'
                required
                autoFocus
              />
              <label className='uploadDetails__title'>Title (required)</label>
            </div>
            <div className='uploadDetails__textarea uploadDetails__textarea--desc'>
              <textarea
                name='description'
                id='uploadDetails-descInput'
                cols='30'
                rows='10'
                onChange={this.props.handleChange("description")}
                className='uploadDetails__input uploadDetails__input--desc'
                placeholder='Tell viewers about your video'
              />
              <label className='uploadDetails__title'>Description</label>
            </div>
          </section>
          <section className='uploadDetails__split uploadDetails__split--right'>
            <div className='uploadDetails__preview'>
              <video className='uploadDetails__video' controls>
                <source src={this.props.videoUrl} type='video/mp4' />
                <source src={this.props.videoUrl} type='video/ogg' />
                <source src={this.props.videoUrl} type='video/webm' />
              </video>
              <section className='uploadDetails__meta'>
                <div className='uploadDetails__fileinfo'>Filename</div>
                <div className='uploadDetails__filename'>
                  {this.props.videoFile.name}
                </div>
              </section>
            </div>
          </section>
        </section>
        <footer className='uploadDetails__footer'>
          <Tooltip content='Video upload processed' position='top'>
            <PublishIcon id='uploadDetails-uploaded' />
          </Tooltip>

          <button
            id='upload-video-submit-btn'
            className='uploadDetails__submit'
            onClick={this.props.handleSubmit}
            disabled={this.disableBtn()}
          >
            Upload
          </button>
        </footer>
      </div>
    );
  }
}
