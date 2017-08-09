import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
// style
import styles from '../../../../../scss/06-components/placeholder.scss';

class RectShape extends PureComponent {
  /**
   * propTypes
   * @property {String} className
   * @property {Object} style
   */
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { className, style } = this.props;
    const classes = [styles.rect, className].filter(c => c).join(' ');

    return (
      <div className={classes} style={{ ...style }} />
    );
  }

}

export default CSSModules(RectShape, styles);
