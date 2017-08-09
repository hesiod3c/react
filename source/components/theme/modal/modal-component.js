import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
// components
import Button from '../button';
import Icon from '../icon';
//styles
import { styles } from '@descco/ui-core';
const classes = styles.modal;

/**
 * Modal Component
 * @extends {PureComponent }
 * @class
 */
class Modal extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props){
    super(props);

    this.overlay = 'overlay';
    this.content = 'content';
  }

  /**
   * defaultProps
   * @property {String} effect
   */
  static defaultProps = {
    effect: 'scaleUp',
    onDismiss: () => {},
    data: {},
    key: undefined
  };

  /**
   * propTypes
   * @property {String} effect
   * @property {Function} onDismiss
   */
  static propTypes = {
    effect: PropTypes.oneOf(['scaleUp', 'slideFromRight', 'slideFromBottom', 'newspaper', 'fall', 'sideFall', 'flipHorizontalThreeD', 'flipVerticalThreeD', 'signThreeD', 'superScaled', 'rotateFromBottomThreeD', 'rotateFromLeftThreeD']),
    onDismiss: PropTypes.func,
    data: PropTypes.object,
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  };

  render() {
    const { effect, onDismiss, data, key } = this.props;

    if(!data) {
      return null;
    }

    const maxWidth =  data ? `${data.maxWidth}px` : 'auto';

    return (
      <div
        ref={(c) => { this.overlay = c; }}
        className={classes.overlay}
        key={key}
      >
        <div
          ref={(c) => { this.content = c; }}
          className={classNames(classes.content, classes[effect])}
          style={ {maxWidth: maxWidth}}
        >
          <div>
            { data.header &&
            <header className={classes.header}>
              <h3 className={classes['header-title']}>{data.header}</h3>
              <Button onClick={() => onDismiss(data)}>
                <Icon name="close" />
              </Button>
            </header>
            }
            <div className={classes.body}>
              {data.body}
            </div>
            {data.footer &&
            <footer className={classes.footer}>
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
export default CSSModules(Modal, classes);
