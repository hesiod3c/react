import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
//styles
import { styles } from '@descco/ui-core';
const classes = styles.image;

/**
 * Image Component
 * @extends {PureComponent }
 * @class
 */
class Image extends PureComponent {
  /**
   * defaultProps
   * @property {Boolean} rounded
   * @property {Boolean} circle
   * @property {Boolean} thumbnail
   * @property {String} size
   * @property {String} align
   * @property {Boolean} path
   * @property {String} className
   */
  static defaultProps = {
    rounded: false,
    circle: false,
    thumbnail: false,
    size: 'medium',
    align: 'left',
    path: false,
    className: undefined
  };

  /**
   * propTypes
   * @property {Boolean} rounded
   * @property {Boolean} circle
   * @property {Boolean} thumbnail
   * @property {String} size
   * @property {String} align
   * @property {String} path
   * @property {String} className
   */
  static propTypes = {
    rounded: PropTypes.bool,
    circle: PropTypes.bool,
    thumbnail: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    path: PropTypes.string.isRequired,
    className: PropTypes.string
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render(){
    const {rounded, circle, thumbnail, size, path, align, className, ...elementProps } = this.props;

    const fullClassName = classNames(
      className,
      {
        [classes[size]]: size,
        [classes.rounded]: rounded,
        [classes.circle]: circle,
        [classes.thumbnail]: thumbnail
      });

    if(!path || path === '') {
      return null;
    }

    return (
      <figure className={classes[align]}>
        <img
          {...elementProps}
          src={path}
          className={fullClassName}
        />
      </figure>
    );

  }
}

/**
 * @example <Image />
 */
export default CSSModules(Image, classes);
