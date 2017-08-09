import { connect } from 'react-redux';
import Logout from './logout-component';
import {
  modalHide,
  modalShow
} from '../modal-manager/modal-manager-actions';

const mapStateToProps = (state) => {
  const modalManager = state.toJS().reducers.modalManager;

  return {
    modal: modalManager.modals
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  return {
    ...ownProps,
    ...stateProps,
    onLogout: (callback) => {
      dispatch(modalHide('LOGOUT_HIDE_MODAL', 'logoutModal'));
      callback();
    },
    showModal: (id, header, body, footer, actionButton) => {
      dispatch(modalShow('LOGOUT_SHOW_MODAL', id, header, body, footer, actionButton));
    },
    hideModal: (item) => {
      dispatch(modalHide('LOGOUT_HIDE_MODAL', item.id));
    },
  };
};

export default connect(mapStateToProps, null, mergeProps)(Logout);
