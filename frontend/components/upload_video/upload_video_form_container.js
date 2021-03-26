import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import { createVideo } from "../../actions/videos_actions";
import UploadVideoForm from "./upload_video_form";

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.video,
    formType: "upload",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    upload: (video) => dispatch(createVideo(video)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideoForm);
