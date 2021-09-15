import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import PublishIcon from "@material-ui/icons/Publish";
import Tooltip from "../tooltip/tooltip";

export default class UploadVideoDragDrop extends React.Component {
  render() {
    return (
      <div className='vid-upload' onClick={(e) => e.stopPropagation()}>
        <header className='vid-upload__header'>
          <span className='vid-upload__header__title '>Upload videos</span>
          <div className='vid-upload__header__btns'>
            <Tooltip content='close'>
              <CloseIcon
                id='upload-close-btn'
                onClick={this.props.closeModal}
              />
            </Tooltip>
          </div>
        </header>
        <div
          className='vid-upload__body'
          onDrop={this.props.handleDrop}
          onDragEnter={this.props.handleDragEnter}
          onDragOver={this.props.handleDragOver}
        >
          <label className='vid-upload__body__icon'>
            <input type='file' onChange={this.props.handleFile} />
            <PublishIcon id='upload-big-btn' />
          </label>
          <p className='vid-upload__body__title'>
            Drag and drop video files to upload
          </p>
          <p className='vid-upload__body__subtitle'>
            Your videos will be private until you publish them
          </p>
          <label className='vid-upload__body__button'>
            <input type='file' onChange={this.props.handleFile} />
            <span className='vid-upload__body__button__text'>SELECT FILES</span>
          </label>
        </div>
      </div>
    );
  }
}
