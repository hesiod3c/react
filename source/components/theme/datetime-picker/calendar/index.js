import React, { PureComponent, PropTypes } from 'react';
import DaysView from './days';
import MonthsView from './months';
import YearsView from './years';
import TimeView from './time';

/**
 * CalendarContainer component
 * @extends {PureComponent }
 * @class
 */
class CalendarContainer extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.viewComponents = {
      days: DaysView,
      months: MonthsView,
      years: YearsView,
      time: TimeView
    };
  }

  /**
   * defaultProps
   * @property {String} view
   */
  static defaultProps = {
    view: 'days'
  };

  /**
   * propTypes
   * @property {String} view
   */
  static propTypes = {
    view: PropTypes.string
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { view, ...viewProps } = this.props;
    const Component = this.viewComponents[view];

    return (
      <Component {...viewProps} />
    );
  }
}

export default CalendarContainer;
