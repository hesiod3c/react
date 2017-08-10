import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
//styles
import { styles } from '@descco/ui-core';
const classes = styles.helpText;

/**
 * HelpText
 * @extends {PureComponent }
 * @class
 */
class HelpText extends PureComponent {
  /**
   * defaultProps
   * @property {Boolean} children
   * @property {String} className
   */
  static defaultProps = {
    children: false,
    className: undefined
  };

  /**
   * propTypes
   * @property {String} children
   * @property {String} className
   */
  static propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { children, className, ...elementProps } = this.props;

    if (!children) {
      return null;
    }

    return (
      <span
        {...elementProps}
        className={classNames(className, classes['help-text'])}
      >
        { children }
      </span>
    );
  }
}

/**
 * @example <HelpText>Text</HelpText>
 */
export default CSSModules(HelpText, classes);
