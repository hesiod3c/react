import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
// components
import Button from '../button';
import Icon from '../icon';
//styles
import { styles } from '@descco/ui-core';
const classes = styles.tag;

/**
 * Tag component
 * @extends {PureComponent }
 * @class
 */
class Tag extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * defaultProps
   * @property {Boolean} children
   */
  static defaultProps = {
    children: false,
    onRemove: () => {},
    onClick: () => {},
    className: undefined
  };

  /**
   * propTypes
   * @property {Function} onClick
   * @property {Object} children
   */
  static propTypes = {
    children: PropTypes.any.isRequired,
    onRemove: PropTypes.func,
    onClick: PropTypes.func,
    className: PropTypes.string
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { children, onRemove, className, ...rest } = this.props;

    if (!children) {
      return null;
    }

    return (
      <div
        {...rest}
        className={classNames(className, classes.tag)}
      >
        {children}
        <span className={classes['tag-close']}>
          <Button onClick={onRemove}>
            <Icon name="close" size="12px" />
          </Button>
        </span>
      </div>
    );
  }
}

/**
 * @example <Tag />
 */
export default CSSModules(Tag, classes);


