import React from "react";
import UploadFormVideoContainer from "../upload_form/upload_form_video_container";

const Modal = ({ modal, hideModal }) => {
  if (!modal) return null;

  return (
    <div className="modal">
      <div className="modal__container" onClick={hideModal}>
        <div
          className="modal__container__upload"
          onClick={(e) => e.stopPropagation()}
        >
          <UploadFormVideoContainer />
        </div>
      </div>
    </div>
  );
};
export default Modal;
