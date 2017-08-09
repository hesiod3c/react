import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Alert from '../../theme/alert';
//styles
import data from '../../../interface';
const styles = data.styles.notifierManager;

/**
 * Notifier component
 * @extends {PureComponent }
 * @class
 */
class Notifier extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.dismissAlert = this.dismissAlert.bind(this);
  }

  /**
   * defaultProps
   * @param {String} position
   * @param {Array} alerts
   */
  static defaultProps = {
    position: 'top-right',
    alerts: []
  };

  /**
   * propTypes
   * @param {String} position
   * @param {Array} alerts
   * @param {Array} onDismiss
   * @param {Number} timeout
   * @param {String} dismissTitle
   * @param {Boolean} showIcon
   */
  static propTypes = {
    position: PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']),
    alerts: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.any.isRequired,
      type: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
      headline: PropTypes.string,
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object]).isRequired
    })).isRequired,
    onDismiss: PropTypes.func,
    timeout: PropTypes.number,
    dismissTitle: PropTypes.string,
    showIcon: PropTypes.bool,
  };

  dismissAlert(onDismiss) {
    // actually dismiss the alert
    onDismiss();
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render(){

    const { position, alerts, onDismiss, timeout, ...elementProps } = this.props;

    const fullClassName = classNames(
      styles.container, {
        [styles[position]]: position,
      });

    return (
      <div className={fullClassName}>
        <ReactCSSTransitionGroup transitionName={styles} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {alerts && alerts.map(item => {
            const dismiss = onDismiss ? () => onDismiss(item) : null;
            const { message, ...alertProps } = item;

            // TODO: improvement for the timeout controller
            if (timeout && onDismiss) {
              setTimeout(() => {
                onDismiss(item);
              }, timeout + 500 + 300);
            }

            return (
              <Alert key={item.id} {...elementProps} {...alertProps} onDismiss={this.dismissAlert.bind(this, dismiss)} dark showIcon>
                {message}
              </Alert>
            );
          })}
        </ReactCSSTransitionGroup>
      </div>
    );

  }
}

/**
 * @example <Notifier />
 */
export default CSSModules(Notifier, styles);
