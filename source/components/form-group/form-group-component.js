import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
//styles
import { styles, utils } from '@descco/ui-core';
const classes = styles.formGroup;
const randomId = utils.property.randomId;

/**
 * Form Group component
 * @extends {PureComponent }
 * @class
 */
class FormGroup extends PureComponent {
  /**
   * defaultProps
   * @property {String} controlId
   * @property {String} style
   * @property {Boolean} validationState
   * @property {Boolean} withoutTopLabel
   */
  static defaultProps = {
    controlId: '',
    style: undefined,
    validationState: undefined,
    withoutTopLabel: false
  };

  /**
   * propTypes
   * @property {String} controlId
   * @property {String} style
   * @property {String} validationState
   * @property {Boolean} withoutTopLabel
   */
  static propTypes = {
    controlId: PropTypes.string,
    style: PropTypes.oneOf(['checkbox', 'radio']),
    validationState: PropTypes.oneOf(['success', 'warning', 'error']),
    withoutTopLabel: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string
  };

  /**
   * contextTypes
   * @property {Object} $formGroup
   */
  static childContextTypes = {
    $formGroup: PropTypes.object.isRequired
  };

  /**
   * getChildContext
   */
  getChildContext() {
    const { controlId, validationState } = this.props;
    const id = controlId ? controlId : randomId();

    return {
      $formGroup: {
        controlId: id,
        validationState
      }
    };
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render(){
    const { validationState, children, className, style, withoutTopLabel } = this.props;

    const validationStateClass = `has-${validationState}`;

    const formGroupClass = classNames(
      className,
      classes['form-group'],
      {
        [classes[validationStateClass]]: validationState,
        [classes['form-group--checkbox']]: style === 'checkbox',
        [classes['form-group--radio']]: style === 'radio',
        [classes['form-group--withoutTopLabel']]: withoutTopLabel
      }
    );

    return (
      <div
        className={formGroupClass}
      >
        {children}
      </div>
    );
  }
}

/**
 * @example <FormGroup></FormGroup>
 */
export default CSSModules(FormGroup, classes);
