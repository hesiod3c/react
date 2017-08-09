import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../../theme/button';
import Icon from  '../../theme/icon';
import ModalManager from '../modal-manager';

//styles
import data from '../../../interface';
const styles = data.styles.logout;

/**
 * Logout Component
 * @extends {PureComponent }
 * @class
 */
class Logout extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.onConfirm = this.onConfirm.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
  }

  /**
   * defaultProps
   * @property {Function} hideNotifier
   * @property {Function} showModal
   * @property {Function} hideModal
   * @property {Array} modal
   * @property {Array} notifier
   */
  static defaultProps = {
    hideNotifier: () => {},
    showModal: () => {},
    hideModal: () => {},
    modal: [],
    notifier: []
  };

  /**
   * propTypes
   * @property {Function} showModal
   * @property {Function} hideModal
   * @property {String} modal
   */
  static propTypes = {
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    modal: PropTypes.array
  };

  /**
   * contextTypes
   * @property {Object} router
   */
  static contextTypes = {
    router: PropTypes.object
  };

  /**
   * onConfirm
   */
  onConfirm() {
    this.props.onLogout(this.props.handleLogout);
  }

  /**
   * Modal
   */
  modalOpen() {
    const id = 'logoutModal';
    const header = 'Confirmação';
    const body = () => {
      return (
        <div>
          <p>Deseja realmente sair?</p>
        </div>
      );
    };
    const actionButton = () => {
      return (
        <Button style="primary" onClick={this.onConfirm}>Confirmar</Button>
      );
    };
    this.props.showModal(id, header, body(), true, actionButton());
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        <Button onClick={this.modalOpen}>
          Sair <Icon name="exit" />
        </Button>
        <ModalManager modals={this.props.modal} effect={'slideFromRight'} onDismiss={this.props.hideModal} />
      </div>
    );
  }
}

export default Logout;
