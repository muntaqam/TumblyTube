import React from "react";
import UploadVideoDragDrop from "./upload_video_dragdrop";
import UploadVideoDetails from "./upload_video_details";

class UploadVideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      videoFile: null,
      videoUrl: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
  }

  componentDidUpdate() {
    let uploadBtn = document.getElementById("upload-video-submit-btn");

    if (this.state.title.length === 0) {
      uploadBtn.setAttribute("disabled", "");
    } else {
      uploadBtn.removeAttribute("disabled", "");
    }
  }

  handleChange(type) {
    return (e) => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    let file = e.dataTransfer.files[0];
    this.setState({ videoFile: file });
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({ videoUrl: fileReader.result, videoFile: file });
    };

    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      this.setState({ videoUrl: null, videoFile: null });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("video[title]", this.state.title);
    formData.append("video[description]", this.state.description);
    formData.append("video[video_file]", this.state.videoFile);
    this.props.upload(formData);
    this.props.closeModal();
  }

  render() {
    const { title, description, videoFile, videoUrl } = this.state;
    const { closeModal, currentUser } = this.props;

    let formStep;
    if (!this.state.videoUrl) {
      formStep = (
        <UploadVideoDragDrop
          closeModal={closeModal}
          handleDrop={this.handleDrop}
          handleDragOver={this.handleDragOver}
          handleDragEnter={this.handleDragEnter}
          handleFile={this.handleFile}
        />
      );
    } else {
      formStep = (
        <UploadVideoDetails
          closeModal={closeModal}
          title={title}
          description={description}
          videoFile={videoFile}
          videoUrl={videoUrl}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      );
    }

    return formStep;
  }
}

export default UploadVideoForm;
