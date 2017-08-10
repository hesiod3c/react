import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
// components
import Icon from '../icon';
//styles
import { styles } from '@descco/ui-core';
const classes = styles.formControl;

/**
 * Form Control component
 * @extends {PureComponent }
 * @class
 */
class FormControl extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props, context){
    super(props, context);

    this.type = this.props.type;
    this.hasTypeProperty = this.type !== 'select' && this.type !== 'textarea';

    this.componentRender = this.componentRender.bind(this);
  }

  /**
   * Default props values
   * @property {Function} onChange
   * @property {Function} onFocus
   * @property {Function} onBlur
   * @property {Node} addonBefore
   * @property {Node} addonAfter
   * @property {Boolean} feedback
   * @property {String} type
   */
  static defaultProps = {
    disabled: false,
    addonBefore: false,
    addonAfter: false,
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    feedback: false,
    type: 'text'
  };

  /**
   * propTypes
   * @property {Node} children
   * @property {Function} getRef
   * @property {Function} onChange
   * @property {Function} onFocus
   * @property {Function} onBlur
   * @property {Node} addonBefore
   * @property {Node} addonAfter
   * @property {Boolean} feedback
   * @property {String} type
   */
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onMask: PropTypes.func,
    disabled: PropTypes.bool,
    getRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    addonAfter: PropTypes.node,
    addonBefore: PropTypes.node,
    feedback: PropTypes.bool,
    type: PropTypes.oneOf([
      'text',
      'password',
      'select',
      'textarea',
      'radio',
      'checkbox',
      'file',
      'hidden',
      'search',
      'email',
      'range',
      'number',
      'month',
      'tel',
      'time',
      'url',
      'week',
      'date',
      'datetime',
      'color'
    ])
  };

  /**
   * contextTypes
   * @property {Object} $formGroup
   */
  static contextTypes = {
    $formGroup: PropTypes.object
  };

  /**
   * Generate Addon
   */
  static addonRender(type, children) {
    if (!type || !children) {
      return null;
    }

    return (
      <span className={classes[`form-addon-${type}`]}>{children}</span>
    );
  }

  /**
   * Generate Feedback
   */
  static feedbackRender(validationState, feedback, addonAfter) {
    if ((!validationState && !feedback && addonAfter) || !feedback || !validationState) {
      return null;
    }

    let iconName;

    switch (validationState) {
    case 'success':
      iconName = 'check';
      break;
    case 'warning':
      iconName = 'warning';
      break;
    case 'error':
      iconName = 'close';
      break;
    }

    return (
      <span className={classes['form-feedback']}>
        <Icon name={iconName} />
      </span>
    );
  }

  /**
   * Generate component
   */
  componentRender(controlId, type) {
    const Component =  this.hasTypeProperty ? 'input' : type ;
    const { getRef, onChange, onFocus, onBlur, disabled, children, name, value, onMask } = this.props;
    const isClassDefault = ['radio', 'checkbox', 'textarea', 'select'].indexOf(type) < 0;
    const componentClass = classNames({
      [classes['form-field']] : isClassDefault,
      [classes['form-field--radio']]: type === 'radio',
      [classes['form-field--checkbox']]: type === 'checkbox',
      [classes['form-field--textarea']]: type === 'textarea',
      [classes['form-field--select']]: type === 'select'
    });
    let tagType;
    // Has type property
    if (this.hasTypeProperty) {
      tagType = type;
    }

    let newValue;
    if(onMask) {
      newValue = onMask(value);
    } else {
      newValue = value;
    }

    return (
      <Component
        type={tagType}
        ref={getRef}
        className={componentClass}
        id={controlId}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        name={name}
        value={newValue}
      >
        {children}
      </Component>
    );
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render(){
    const { type, addonBefore, addonAfter, feedback, className } = this.props;
    // context
    const formGroup = this.context.$formGroup;
    const controlId = formGroup && formGroup.controlId || undefined;
    const validationState = formGroup && formGroup.validationState;
    // classes
    const addonClass = classNames(
      className, classes['form-addon'],
      { [classes['form-addon--withItens']] : (addonBefore || addonAfter || feedback) }
    );
    // internal components
    const generateAddonBefore = FormControl.addonRender('before', addonBefore);
    const generateAddonAfter = FormControl.addonRender('after', addonAfter);
    const generateFeedback = FormControl.feedbackRender(validationState, feedback, addonAfter);
    // component
    const generateComponent = this.componentRender(controlId, type);

    return (
      <div className={addonClass}>
        {generateAddonBefore}
        {generateComponent}
        {generateAddonAfter}
        {generateFeedback}
      </div>
    );
  }
}

/**
 * @example <FormControl />
 */
export default CSSModules(FormControl, classes);
