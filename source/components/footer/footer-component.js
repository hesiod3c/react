import React, { PureComponent } from 'react';
import CSSModules from 'react-css-modules';
//styles
import { styles } from '@descco/ui-core';
const classes = styles.footer;

/**
 * Footer commponent
 * @extends {PureComponent }
 * @class
 */
class Footer extends PureComponent {
  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <footer className={classes.footer}>
        <strong className={classes['footer-highlight']}>Copyright</strong> &copy; { new Date().getFullYear() }
      </footer>
    );
  }
}

/**
 * @example <Footer />
 */
export default CSSModules(Footer, classes);
