import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
// components
import Button from '../button';
import Icon from '../icon';
//styles
import data from '../../../interface';
const styles = data.styles.modal;

/**
 * Modal Component
 * @extends {PureComponent }
 * @class
 */
class Modal extends PureComponent {
  /**
   * defaultProps
   * @property {String} effect
   */
  static defaultProps = {
    effect: 'scaleUp'
  };

  /**
   * propTypes
   * @property {String} effect
   * @property {Function} onDismiss
   */
  static propTypes = {
    effect: PropTypes.oneOf(['scaleUp', 'slideFromRight', 'slideFromBottom', 'newspaper', 'fall', 'sideFall', 'flipHorizontalThreeD', 'flipVerticalThreeD', 'signThreeD', 'superScaled', 'rotateFromBottomThreeD', 'rotateFromLeftThreeD']),
    onDismiss: PropTypes.func
  };

  render() {
    const { effect, onDismiss, data, key } = this.props;

    if(!data) {
      return null;
    }

    const maxWidth =  data ? `${data.maxWidth}px` : 'auto';

    return (
      <div
        ref="overlay"
        className={styles.overlay}
        key={key}
      >
        <div
          ref="content"
          className={classNames(styles.content, styles[effect])}
          style={ {maxWidth: maxWidth}}
        >
          <div>
            { data.header &&
            <header className={styles.header}>
              <h3 className={styles['header-title']}>{data.header}</h3>
              <Button onClick={() => onDismiss(data)}>
                <Icon name="close" />
              </Button>
            </header>
            }
            <div className={styles.body}>
              {data.body}
            </div>
            {data.footer &&
            <footer className={styles.footer}>
              <Button onClick={() => onDismiss(data)}>Fechar</Button>
              {data.actionButton}
            </footer>
            }
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @example <Modal />
 */
export default CSSModules(Modal, styles);
