import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
//styles
import { styles } from '@descco/ui-core';
const classes = styles.gridCol;

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
      classes['col'],
      {
        [classes[`col-xs-${xs}`]]: xs,
        [classes[`col-sm-${sm}`]]: sm,
        [classes[`col-md-${md}`]]: md,
        [classes[`col-lg-${lg}`]]: lg,
        [classes[`col-xs-offset-${xsOffset}`]]: xsOffset,
        [classes[`col-sm-offset-${smOffset}`]]: smOffset,
        [classes[`col-md-offset-${mdOffset}`]]: mdOffset,
        [classes[`col-lg-offset-${lgOffset}`]]: lgOffset,
        [classes['reverse']]: reverse
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
export default CSSModules(GridCol, classes);


