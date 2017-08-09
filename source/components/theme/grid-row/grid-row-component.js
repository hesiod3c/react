import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
//styles
import data from '../../../interface';
const styles = data.styles.gridRow;

/**
 * GridRow component
 * @extends {PureComponent }
 * @class
 */
class GridRow extends PureComponent {
  /**
   * propTypes
   * @property {Boolean} reverse
   * @property {String} start
   * @property {String} center
   * @property {String} end
   * @property {String} top
   * @property {String} middle
   * @property {String} bottom
   * @property {String} around
   * @property {String} between
   * @property {String} last
   * @property {Node} children
   */
  static propTypes = {
    reverse: PropTypes.bool,
    start: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    center: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    end: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    top: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    middle: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    bottom: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    around: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    between: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    first: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    last: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    children: PropTypes.node
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {reverse, start, center, end, top, middle, bottom, around, between, first, last, ...elementProps} = this.props;

    const fullClass = classNames(
      styles['row'],
      {
        [styles['reverse']]: reverse,
        [styles[`start-${start}`]]: start,
        [styles[`center-${center}`]]: center,
        [styles[`end-${end}`]]: end,
        [styles[`top-${top}`]]: top,
        [styles[`middle-${middle}`]]: middle,
        [styles[`bottom-${bottom}`]]: bottom,
        [styles[`around-${around}`]]: around,
        [styles[`between-${between}`]]: between,
        [styles[`first-${first}`]]: first,
        [styles[`last-${last}`]]: last
      });

    return (
      <div
        {...elementProps}
        className={fullClass}
      >
        {this.props.children}
      </div>
    );
  }
}

/**
 * @example <GridRow />
 */
export default CSSModules(GridRow, styles);


