import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
//styles
import { styles } from '@descco/ui-core';
const classes = styles.formActions;

/**
 * Form Actions component
 * @extends {PureComponent }
 * @class
 */
class FormActions extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props){
    super(props);
  }
  /**
   * defaultProps
   * @property {Node} children
   * @property {String} className
   */
  static defaultProps = {
    children: undefined,
    className: undefined
  };

  /**
   * propTypes
   * @property {Node} children
   * @property {String} className
   */
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render(){
    const { children, className, ...elementProps } = this.props;

    const fullClassName = classNames(
      className,
      classes['form-group-actions']
    );

    return (
      <div className={fullClassName}
        {...elementProps}
      >
        {children}
      </div>
    );
  }
}

/**
 * @example <FormActions></FormActions>
 */
export default CSSModules(FormActions, classes);
