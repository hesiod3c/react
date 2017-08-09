import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import onClickOutside from 'react-onclickoutside';

/**
 * DateTimePickerDays component
 * @extends {PureComponent }
 * @class
 */
class DateTimePickerDays extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props){
    super(props);

    this.getDaysOfWeek = this.getDaysOfWeek.bind(this);
    this.renderDays = this.renderDays.bind(this);
    this.updateSelectedDate = this.updateSelectedDate.bind(this);
    this.renderDay = this.renderDay.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.alwaysValidDate = this.alwaysValidDate.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  /**
   * propTypes
   * @property {Function} timeFormat
   */
  static propTypes = {
    timeFormat: PropTypes.any,
    selectedDate: PropTypes.any,
    viewDate: PropTypes.any,
    renderDay: PropTypes.any,
    isValidDate: PropTypes.any,
    updateOn: PropTypes.any,
    updateSelectedDate: PropTypes.any,
    handleClickOutside: PropTypes.any,
    subtractTime: PropTypes.any,
    showView: PropTypes.any,
    addTime: PropTypes.any
  };

  /**
   * Get a list of the days of the week
   * @param {Object} locale
   * @return {Array} dow - A list with the shortname of the days
   */
  getDaysOfWeek( locale ) {
    let days = locale._weekdaysMin;
    let first = locale.firstDayOfWeek();
    let dow = [];
    let i = 0;

    days.forEach( function( day ) {
      dow[ (7 + ( i++ ) - first) % 7 ] = day;
    });

    return dow;
  }

  /**
   * renderDays
   * @return {Array} weeks
   */
  renderDays() {
    let date = this.props.viewDate;
    let selected = this.props.selectedDate && this.props.selectedDate.clone();
    let prevMonth = date.clone().subtract( 1, 'months' );
    let currentYear = date.year();
    let currentMonth = date.month();
    let weeks = [];
    let days = [];
    let renderer = this.props.renderDay || this.renderDay;
    let isValid = this.props.isValidDate || this.alwaysValidDate;
    let classes, isDisabled, dayProps, currentDate;

    // Go to the last week of the previous month
    prevMonth.date( prevMonth.daysInMonth() ).startOf( 'week' );
    let lastDay = prevMonth.clone().add( 42, 'd' );

    while ( prevMonth.isBefore( lastDay ) ) {
      classes = 'rdtDay';
      currentDate = prevMonth.clone();

      if ( ( prevMonth.year() === currentYear && prevMonth.month() < currentMonth ) || ( prevMonth.year() < currentYear ) )
        classes += ' rdtOld';
      else if ( ( prevMonth.year() === currentYear && prevMonth.month() > currentMonth ) || ( prevMonth.year() > currentYear ) )
        classes += ' rdtNew';

      if ( selected && prevMonth.isSame( selected, 'day' ) )
        classes += ' rdtActive';

      if ( prevMonth.isSame( moment(), 'day' ) )
        classes += ' rdtToday';

      isDisabled = !isValid( currentDate, selected );
      if ( isDisabled )
        classes += ' rdtDisabled';

      dayProps = {
        key: prevMonth.format( 'M_D' ),
        'data-value': prevMonth.date(),
        className: classes
      };

      if ( !isDisabled )
        dayProps.onClick = this.updateSelectedDate;

      days.push( renderer( dayProps, currentDate, selected ) );

      if ( days.length === 7 ) {
        weeks.push(<tr key={prevMonth.format('M_D')}>{days}</tr>);
        days = [];
      }

      prevMonth.add( 1, 'd' );
    }

    return weeks;
  }

  /**
   * updateSelectedDate
   * @param {EventListener} event
   */
  updateSelectedDate( event ) {
    this.props.updateSelectedDate( event, true );
  }

  /**
   * renderDay
   * @param {Object} props
   * @param {Object} currentDate
   * @return {ReactElement} markup
   */
  renderDay( props, currentDate ) {
    return (
      <td {...props}>{currentDate.date()}</td>
    );
  }

  /**
   * renderFooter
   * @return {ReactElement} markup
   */
  renderFooter() {
    if ( !this.props.timeFormat ) {
      return '';
    }

    let date = this.props.selectedDate || this.props.viewDate;

    return(
      <tfoot key="tf">
        <tr>
          <td onClick={this.props.showView( 'time' )} colSpan="7" className="rdtTimeToggle">{date.format(this.props.timeFormat)}</td>
        </tr>
      </tfoot>
    );
  }

  /**
   * alwaysValidDate
   */
  alwaysValidDate() {
    return 1;
  }

  /**
   * handleClickOutside
   */
  handleClickOutside() {
    this.props.handleClickOutside();
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const footer = this.renderFooter();
    const date = this.props.viewDate;
    const locale = date.localeData();

    return (
      <div className="rdtDays">
        <table>
          <thead key="th">
            <tr key="h">
              <th key="p" className="rdtPrev">
                <span onClick={this.props.subtractTime( 1, 'months' )}>‹</span>
              </th>
              <th key="s" className="rdtSwitch" onClick={this.props.showView( 'months' )} colSpan="5" data-value={this.props.viewDate.month()}>{locale.months( date ) + ' ' + date.year()}</th>
              <th key="n" className="rdtNext">
                <span onClick={this.props.addTime( 1, 'months' )}>›</span>
              </th>
            </tr>
            <tr key="d">
              { this.getDaysOfWeek(locale).map((day, index) => {
                return (
                  <th key={day + index} className="dow">{day}</th>
                );
              })
              }
            </tr>
          </thead>
          <tbody key="tb">
            {this.renderDays()}
          </tbody>
          {footer}
        </table>
      </div>
    );
  }
}

/**
 * @example <DateTimePickerDays />
 */
export default onClickOutside(DateTimePickerDays);
