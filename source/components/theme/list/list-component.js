import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
//styles
import data from '../../../interface';
const styles = data.styles.list;

/**
 * List Component
 * @extends {PureComponent }
 * @class
 */
class List extends PureComponent {
  /**
   * defaultProps
   * @property {String} style
   * @property {Boolean} bordered
   * @property {Boolean} zebra
   */
  static defaultProps = {
    style: 'bordered',
    bordered: false,
    zebra: false
  };

  /**
   * propTypes
   * @property {String} style
   * @property {Boolean} bordered
   * @property {Boolean} zebra
   */
  static propTypes = {
    bordered: PropTypes.bool,
    zebra: PropTypes.bool,
    style: PropTypes.oneOf(['unstyled', 'decimal', 'disc', 'circle', 'zebra', 'bordered'])
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
        [styles[style]]: style,
        [styles[bordered]]: bordered,
        [styles[zebra]]: zebra
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
   * render
   * @return {ReactElement} markup
   */
  render(){
    const { children, className, ...elementProps } = this.props;

    return (
      <li
        {...elementProps}
        className={classNames(styles['list-item'], className)}>
        {children}
      </li>
    );
  }
}

List.Item = ListItem;

/**
 * @example <List><List.Item>text</List.Item></List>
 */
export default CSSModules(List, styles);
