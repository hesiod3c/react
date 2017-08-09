import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
import { randomId } from '../../../utils/property';
//styles
import data from '../../../interface';
const styles = data.styles.formGroup;

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
    style: false,
    validationState: false,
    withoutTopLabel: false
  };

  /**
   * propTypes
   * @property {String} controlId
   * @property {String} style
   * @property {String} validationState
   * @property {Boolean} withoutTopLabel
   */
  static PropTypes = {
    controlId: PropTypes.string,
    style: PropTypes.oneOf(['checkbox', 'radio']),
    validationState: PropTypes.oneOf(['success', 'warning', 'error']),
    withoutTopLabel: PropTypes.bool
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
      styles['form-group'],
      {
        [styles[validationStateClass]]: validationState,
        [styles['form-group--checkbox']]: style === 'checkbox',
        [styles['form-group--radio']]: style === 'radio',
        [styles['form-group--withoutTopLabel']]: withoutTopLabel
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
export default CSSModules(FormGroup, styles);
