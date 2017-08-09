import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Modal from '../../theme/modal';
//styles
import data from '../../../interface';
const styles = data.styles.modalManager;

/**
 * ModalManager Component
 * @extends {PureComponent }
 * @class
 */
class ModalManager extends PureComponent {
  /**
   * defaultProps
   * @property {Array} modal
   */
  static defaultProps = {
    modals: undefined
  };

  /**
   * propTypes
   * @property {Array} modal
   */
  static propTypes = {
    modals: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.any.isRequired,
      header: PropTypes.string,
      body: PropTypes.any,
      footer: PropTypes.bool,
      actionButton: PropTypes.any,
      maxWidth: PropTypes.number
    }))
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { modals, className, effect, onDismiss } = this.props;

    return (
      <div className={className}>
        {modals && modals.map((item, index) => {
          return (
            <Modal key={index} data={item} effect={effect} onDismiss={onDismiss} />
          );
        })}
      </div>
    );
  }
}

/**
 * @example <ModalManager />
 */
export default CSSModules(ModalManager, styles);
