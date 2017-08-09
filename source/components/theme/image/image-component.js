import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
//styles
import data from '../../../interface';
const styles = data.styles.image;

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
   */
  static defaultProps = {
    rounded: false,
    circle: false,
    thumbnail: false,
    size: 'medium',
    align: 'left',
    path: false
  };

  /**
   * propTypes
   * @property {Boolean} rounded
   * @property {Boolean} circle
   * @property {Boolean} thumbnail
   * @property {String} size
   * @property {String} align
   * @property {String} path
   */
  static propTypes = {
    rounded: PropTypes.bool,
    circle: PropTypes.bool,
    thumbnail: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    path: PropTypes.string.isRequired
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
        [styles[size]]: size,
        [styles.rounded]: rounded,
        [styles.circle]: circle,
        [styles.thumbnail]: thumbnail
      });

    if(!path || path === '') {
      return null;
    }

    return (
      <figure className={styles[align]}>
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
export default CSSModules(Image, styles);
