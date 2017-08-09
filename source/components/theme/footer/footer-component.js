import React, { PureComponent } from 'react';
import CSSModules from 'react-css-modules';
//styles
import data from '../../../interface';
const styles = data.styles.footer;

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
      <footer className={styles.footer}>
        <strong className={styles['footer-highlight']}>Copyright</strong> B2W Digital &copy; { new Date().getFullYear() }
      </footer>
    );
  }
}

/**
 * @example <Footer />
 */
export default CSSModules(Footer, styles);
