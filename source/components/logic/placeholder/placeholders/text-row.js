import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
// style
import styles from '../../../../../scss/06-components/placeholder.scss';

class TextRow extends PureComponent {
  /**
   * propTypes
   * @property {String} className
   * @property {Number/String} lineSpacing
   * @property {Object} style
   */
  static propTypes = {
    className: PropTypes.string,
    lineSpacing: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    style: PropTypes.object
  };

  /**
   * defaultProps
   * @property {Number/String} lineSpacing
   */
  static defaultProps = {
    lineSpacing: '0.7em'
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { className, maxHeight, lineSpacing, style } = this.props;

    const defaultStyles = {
      maxHeight,
      marginTop: lineSpacing
    };

    const classes = [styles.text, className].filter(c => c).join(' ');

    return (
      <div
        className={classes}
        style={{ ...defaultStyles, ...style }}
      />
    );
  }

}

export default CSSModules(TextRow, styles);
