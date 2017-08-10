import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
//styles
import { styles } from '@descco/ui-core';
const classes = styles.panel;

/**
 * Panel component
 * @extends {PureComponent }
 * @class
 */
class Panel extends PureComponent {
  /**
   * defaultProps
   * @property {Boolean} scroll
   * @property {String} header
   * @property {String} footer
   * @property {String} footerAddon
   * @property {Node} children
   * @property {String} className
   */
  static defaultProps = {
    scroll: false,
    header: undefined,
    footer: undefined,
    footerAddon: undefined,
    children: undefined,
    className: undefined
  };

  /**
   * propTypes
   * @property {Boolean} scroll
   * @property {String} header
   * @property {String} footer
   * @property {String} footerAddon
   * @property {Node} children
   * @property {String} className
   */
  static propTypes = {
    scroll: PropTypes.bool,
    header: PropTypes.string,
    footer: PropTypes.string,
    footerAddon: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render(){
    const { children, scroll, header, footer, footerAddon, className, ...elementProps } = this.props;

    const fullClassName = classNames(
      className,
      classes.panel
    );

    if (!children){
      return null;
    }

    return (
      <section className={fullClassName}>
        {header &&
          <header className={classes['panel-header']}>
            <h3>{header}</h3>
          </header>
        }
        {children &&
          <div className={classNames(classes['panel-content'], { [classes['panel-content--scroll']]: scroll})}
            {...elementProps}
          >
            {children}
          </div>
        }
        {footer &&
          <footer className={classes['panel-footer']}>
            <span className={classes['panel-footer-info']}>{footer}</span>
            <span className={classes['panel-footer-addon']}>{footerAddon}</span>
          </footer>
        }
      </section>
    );

  }
}

/**
 * @example <Panel />
 */
export default CSSModules(Panel, classes);
