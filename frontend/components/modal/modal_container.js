import { connect } from "react-redux";
import Modal from "./modal";
import { hideModal } from "../../actions/modal_actions";

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => dispatch(hideModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
