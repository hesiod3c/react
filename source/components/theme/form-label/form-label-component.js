import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
//styles
import data from '../../../interface';
const styles = data.styles.formLabel;

/**
 * Form Label component
 * @extends {PureComponent }
 * @class
 */
class FormLabel extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props, context){
    super(props, context);
  }

  /**
   * defaultProps
   * @property {Boolean} addon
   */
  static defaultProps = {
    addon: undefined
  };

  /**
   * propTypes
   * @property {Node} addon
   * @property {Node} children
   */
  static propTypes = {
    addon: PropTypes.node,
    children: PropTypes.node
  };

  /**
   * contextTypes
   * @property {Object} $formGroup
   */
  static contextTypes = {
    $formGroup: PropTypes.object
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render(){
    const { addon, children, className, ...elementProps } = this.props;

    const fullClassName = classNames(
      className,
      styles.label
    );

    // context
    const formGroup = this.context.$formGroup;
    const controlId = formGroup && formGroup.controlId || undefined;

    if (!addon && !children) {
      return null;
    }

    return (
      <label
        {...elementProps}
        className={fullClassName}
        htmlFor={controlId}>
        {children}
        { addon &&
        <span className={styles['label-addon']}>{addon}</span>
        }
      </label>
    );
  }
}

/**
 * @example <FormLabel></FormLabel>
 */
export default CSSModules(FormLabel, styles);
