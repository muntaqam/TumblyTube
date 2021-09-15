import React, { useContext } from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import UploadVideoFormContainer from "../upload_video/upload_video_form_container";
import SideBar from "../side_bar/side_bar";
import { SidebarContext } from "../root";
import ConfirmationModal from "./confirmation_modal";

function Modal({ modal, closeModal }) {
  if (!modal) return null;

  const { sidebarExpanded, toggleExpanded } = useContext(SidebarContext);

  const handleClose = () => {
    closeModal();
    if (modal === "sidebar") toggleExpanded();
  };

  let component;
  switch (modal.mode) {
    case "upload":
      component = <UploadVideoFormContainer />;
      break;
    case "sidebar":
      component = <SideBar modal={true} />; // toggleExpanded if modal
      break;
    case "unsubscribe":
      component = <ConfirmationModal mode={modal.mode} meta={modal.meta} />;
      break;
    case "deleteComment":
      component = <ConfirmationModal mode={modal.mode} meta={modal.meta} />;
      break;
    default:
      return null;
  }

  return (
    <div className='modal-background' onClick={handleClose}>
      {component}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
