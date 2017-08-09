import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
//styles
import data from '../../../interface';
const styles = data.styles.grid;

/**
 * Grid component
 * @extends {PureComponent }
 * @class
 */
class Grid extends PureComponent {
  /**
   * defaultProps
   * @property {Boolean} fluid
   */
  static defaultProps = {
    fluid: false
  };

  /**
   * propTypes
   * @property {Boolean} fluid
   * @property {Node} children
   */
  static propTypes = {
    fluid: PropTypes.bool,
    children: PropTypes.node
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {fluid, ...elementProps} = this.props;

    const classes = classNames({
      [styles['container-fluid']]: fluid,
      [styles['container']]: !fluid,
    });

    return (
      <div
        {...elementProps}
        className={classes}
      >
        {this.props.children}
      </div>
    );
  }
}

/**
 * @example <Grid />
 */
export default CSSModules(Grid, styles);


