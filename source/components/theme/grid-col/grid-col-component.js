import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
//styles
import data from '../../../interface';
const styles = data.styles.gridCol;

/**
 * GridCol component
 * @extends {PureComponent }
 * @class
 */
class GridCol extends PureComponent {
  /**
   * propTypes
   * @property {Number/Boolean} xs
   * @property {Number/Boolean} sm
   * @property {Number/Boolean} md
   * @property {Number/Boolean} lg
   * @property {Number} xsOffset
   * @property {Number} smOffset
   * @property {Number} mdOffset
   * @property {Number} lgOffset
   * @property {Boolean} reverse
   * @property {Node} children
   */
  static propTypes = {
    xs: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    sm: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    md: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    lg: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    xsOffset: PropTypes.number,
    smOffset: PropTypes.number,
    mdOffset: PropTypes.number,
    lgOffset: PropTypes.number,
    reverse: PropTypes.bool,
    children: PropTypes.node
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {xs, sm, md, lg, xsOffset, smOffset, mdOffset, lgOffset, reverse, children, ...elementProps} = this.props;

    const fullClass = classNames(
      styles['col'],
      {
        [styles[`col-xs-${xs}`]]: xs,
        [styles[`col-sm-${sm}`]]: sm,
        [styles[`col-md-${md}`]]: md,
        [styles[`col-lg-${lg}`]]: lg,
        [styles[`col-xs-offset-${xsOffset}`]]: xsOffset,
        [styles[`col-sm-offset-${smOffset}`]]: smOffset,
        [styles[`col-md-offset-${mdOffset}`]]: mdOffset,
        [styles[`col-lg-offset-${lgOffset}`]]: lgOffset,
        [styles['reverse']]: reverse
      });

    return (
      <div
        {...elementProps}
        className={fullClass}
      >
        {children}
      </div>
    );
  }
}

/**
 * @example <GridCol />
 */
export default CSSModules(GridCol, styles);


