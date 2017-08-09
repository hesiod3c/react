import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
//styles
import { styles } from '@descco/ui-core';
const classes = styles.breadcrumb;

/**
 * Breadcrumb component
 * @extends {PureComponent }
 * @class
 */
class Breadcrumb extends PureComponent {
  /**
   * render
   * @return {ReactElement} markup
   */
  render(){
    const { children, className, ...elementProps } = this.props;

    return (
      <ol
        {...elementProps}
        className={classNames(className, classes['breadcrumb-list'])}>
        {children}
      </ol>
    );
  }
}

/**
 * BreadcrumbItem component
 * @extends {PureComponent }
 * @class
 */
class BreadcrumbItem extends PureComponent {
  /**
   * defaultProps
   * @property {Boolean} url
   * @property {Boolean} text
   */
  static defaultProps = {
    url: undefined,
    text: undefined
  };

  /**
   * propTypes
   * @property {String} url
   * @property {String} text
   */
  static propTypes = {
    url: PropTypes.string,
    text: PropTypes.string
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render(){
    const { text, url, ...elementProps } = this.props;

    return (
      <li
        {...elementProps}
        className={classes['breadcrumb-item']}>
        {url
          ?
          <a href={url} className={classes['breadcrumb-link']}>{text}</a>
          :
          <strong className={classes['breadcrumb-text']}>{text}</strong>
        }
      </li>
    );
  }
}

/**
 * @example <Breadcrumb.Item />
 */
Breadcrumb.Item = BreadcrumbItem;

/**
 * @example <Breadcrumb />
 */
export default CSSModules(Breadcrumb, classes);
