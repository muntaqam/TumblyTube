import React, { useContext } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/comment_actions";
import { closeModal } from "../../actions/modal_actions";
import { unsubscribe } from "../../actions/subscription_actions";
import { NotiContext } from "../../context/noti_context";

const ConfirmationModal = ({
  mode,
  meta,
  closeModal,
  unsubscribe,
  deleteComment,
}) => {
  const { addNoti } = useContext(NotiContext);

  let message;
  switch (mode) {
    case "unsubscribe":
      message = `Unsubscribe from ${meta.subscribeeName} ?`;
      break;
    case "deleteComment":
      message = "Delete your comment permanently?";
      break;
  }

  const handleConfirm = () => {
    switch (mode) {
      case "unsubscribe":
        unsubscribe(meta.subscribeeId);
        closeModal();
        addNoti({
          mode: "success",
          message: `Removed ${meta.subscribeeName} from subscriptions`,
        });
        break;
      case "deleteComment":
        deleteComment(meta.commentId);
        closeModal();
        addNoti({ mode: "success", message: "Comment deleted" });
        break;
    }
  };

  return (
    <div className='confirmModal' onClick={(e) => e.stopPropagation()}>
      <section className='confirmModal__split confirmModal__split--top'>
        <div className='confirmModal__message'>{message}</div>
      </section>
      <section className='confirmModal__split confirmModal__split--bottom'>
        <button className='confirmModal__cancel' onClick={closeModal}>
          CANCEL
        </button>
        <button
          className={`confirmModal__submit confirmModal__submit--${
            mode === "unsubscribe" ? "unsubscribe" : "delete"
          }`}
          onClick={handleConfirm}
        >
          {mode === "unsubscribe" ? "UNSUBSCRIBE" : "DELETE"}
        </button>
      </section>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    unsubscribe: (subscribeeId) => dispatch(unsubscribe(subscribeeId)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal);
