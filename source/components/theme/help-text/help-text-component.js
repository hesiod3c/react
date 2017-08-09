import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
//styles
import data from '../../../interface';
const styles = data.styles.helpText;

/**
 * HelpText
 * @extends {PureComponent }
 * @class
 */
class HelpText extends PureComponent {
  /**
   * defaultProps
   * @property {Boolean} children
   */
  static defaultProps = {
    children: false
  };

  /**
   * propTypes
   * @property {String} children
   */
  static propTypes = {
    children: PropTypes.string.isRequired
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
        className={classNames(className, styles['help-text'])}
      >
        { children }
      </span>
    );
  }
}

/**
 * @example <HelpText>Text</HelpText>
 */
export default CSSModules(HelpText, styles);
