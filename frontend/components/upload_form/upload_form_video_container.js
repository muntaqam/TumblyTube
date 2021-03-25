import { connect } from "react-redux";
import { hideModal } from "../../actions/modal_actions";
import { createVideo } from "../../actions/videos_actions";
import UploadVideoForm from "./upload_form_video";

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.video,
    formType: "uploadVideo",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => dispatch(hideModal()),
    upload: (video) => dispatch(createVideo(video)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideoForm);
