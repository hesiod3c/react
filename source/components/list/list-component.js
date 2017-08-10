import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
//styles
import { styles } from '@descco/ui-core';
const classes = styles.list;

/**
 * List Component
 * @extends {PureComponent }
 * @class
 */
class List extends PureComponent {
  /**
   * defaultProps
   * @property {Node} children
   * @property {Boolean} bordered
   * @property {Boolean} zebra
   * @property {String} style
   * @property {String} className
   */
  static defaultProps = {
    children: undefined,
    bordered: false,
    zebra: false,
    style: 'bordered',
    className: undefined
  };

  /**
   * propTypes
   * @property {Node} children
   * @property {Boolean} bordered
   * @property {Boolean} zebra
   * @property {String} style
   * @property {String} className
   */
  static propTypes = {
    children: PropTypes.node,
    bordered: PropTypes.bool,
    zebra: PropTypes.bool,
    style: PropTypes.oneOf(['unstyled', 'decimal', 'disc', 'circle', 'zebra', 'bordered']),
    className: PropTypes.string
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render(){
    const { children, bordered, zebra, style, className, ...elementProps } = this.props;

    const fullClassName = classNames(
      className,
      {
        [classes[style]]: style,
        [classes[bordered]]: bordered,
        [classes[zebra]]: zebra
      }
    );

    return (
      <ul
        {...elementProps}
        className={fullClassName}>
        {children}
      </ul>
    );
  }
}

/**
 * ListItem Component
 * @extends {PureComponent }
 * @class
 */
class ListItem extends PureComponent {
  /**
   * defaultProps
   * @property {Node} children
   * @property {String} className
   */
  static defaultProps = {
    children: undefined,
    className: undefined
  };

  /**
   * propTypes
   * @property {Node} children
   * @property {String} className
   */
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };
  /**
   * render
   * @return {ReactElement} markup
   */
  render(){
    const { children, className, ...elementProps } = this.props;

    return (
      <li
        {...elementProps}
        className={classNames(classes['list-item'], className)}>
        {children}
      </li>
    );
  }
}

List.Item = ListItem;

/**
 * @example <List><List.Item>text</List.Item></List>
 */
export default CSSModules(List, classes);
