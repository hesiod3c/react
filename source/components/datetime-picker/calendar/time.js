import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

/**
 * DateTimePickerTime component
 * @extends {PureComponent }
 * @class
 */
class DateTimePickerTime extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props){
    super(props);

    this.calculateState = this.calculateState.bind(this);
    this.renderCounter = this.renderCounter.bind(this);
    this.renderDayPart = this.renderDayPart.bind(this);
    this.updateMilli = this.updateMilli.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.onStartClicking = this.onStartClicking.bind(this);
    this.toggleDayPart = this.toggleDayPart.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.pad = this.pad.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = this.calculateState( this.props );

    this.padValues = {
      hours: 1,
      minutes: 2,
      seconds: 2,
      milliseconds: 3
    };
  }

  /**
   * propTypes
   * @property {Function} timeFormat
   */
  static propTypes = {
    timeFormat: PropTypes.any,
    setTime: PropTypes.any,
    dateFormat: PropTypes.any,
    selectedDate: PropTypes.any,
    viewDate: PropTypes.any,
    showView: PropTypes.any,
    handleClickOutside: PropTypes.any,
  };

  /**
   * calculateState
   * @param {Object} props
   */
  calculateState( props ) {
    let date = props.selectedDate || props.viewDate;
    let format = props.timeFormat;
    let counters = [];

    if ( format.toLowerCase().indexOf('h') !== -1 ) {
      counters.push('hours');
      if ( format.indexOf('m') !== -1 ) {
        counters.push('minutes');
        if ( format.indexOf('s') !== -1 ) {
          counters.push('seconds');
        }
      }
    }

    let daypart = false;
    if ( this.state !== null && this.props.timeFormat.toLowerCase().indexOf( ' a' ) !== -1 ) {
      if ( this.props.timeFormat.indexOf( ' A' ) !== -1 ) {
        daypart = ( this.state.hours >= 12 ) ? 'PM' : 'AM';
      } else {
        daypart = ( this.state.hours >= 12 ) ? 'pm' : 'am';
      }
    }

    return {
      hours: date.format( 'H' ),
      minutes: date.format( 'mm' ),
      seconds: date.format( 'ss' ),
      milliseconds: date.format( 'SSS' ),
      daypart: daypart,
      counters: counters
    };
  }

  /**
   * renderCounter
   * @param {String} type
   */
  renderCounter( type ) {
    if ( type !== 'daypart' ) {
      let value = this.state[ type ];
      if ( type === 'hours' && this.props.timeFormat.toLowerCase().indexOf( ' a' ) !== -1 ) {
        value = ( value - 1 ) % 12 + 1;

        if ( value === 0 ) {
          value = 12;
        }
      }

      return(
        <div key={type} className="rdtCounter">
          <span key="up" className="rdtBtn" onMouseDown={this.onStartClicking( 'increase', type )}>▲</span>
          <div key="c" className="rdtCount">{value}</div>
          <span key="do" className="rdtBtn" onMouseDown={this.onStartClicking( 'decrease', type )}>▼</span>
        </div>
      );
    }
    return '';
  }

  /**
   * renderDayPart
   */
  renderDayPart() {
    return(
      <div key="dayPart" className="rdtCounter">
        <span key="up" className="rdtBtn" onMouseDown={this.onStartClicking( 'toggleDayPart', 'hours')}>▲</span>
        <div key={this.state.daypart} className="rdtCount">{this.state.daypart}</div>
        <span key="do" className="rdtBtn" onMouseDown={this.onStartClicking( 'toggleDayPart', 'hours')}>▼</span>
      </div>
    );
  }

  /**
   * componentWillMount
   */
  componentWillMount() {
    let me = this;
    me.timeConstraints = {
      hours: {
        min: 0,
        max: 23,
        step: 1
      },
      minutes: {
        min: 0,
        max: 59,
        step: 1
      },
      seconds: {
        min: 0,
        max: 59,
        step: 1
      },
      milliseconds: {
        min: 0,
        max: 999,
        step: 1
      }
    };
    ['hours', 'minutes', 'seconds', 'milliseconds'].forEach( function( type ) {
      Object.assign(me.timeConstraints[ type ], me.props.timeConstraints[ type ]);
    });
    this.setState( this.calculateState( this.props ) );
  }

  /**
   * componentWillReceiveProps
   */
  componentWillReceiveProps( nextProps ) {
    this.setState( this.calculateState( nextProps ) );
  }

  /**
   * updateMilli
   * @param {EventListener} e
   */
  updateMilli( e ) {
    let milli = parseInt( e.target.value, 10 );
    if ( milli === e.target.value && milli >= 0 && milli < 1000 ) {
      this.props.setTime( 'milliseconds', milli );
      this.setState( { milliseconds: milli } );
    }
  }

  /**
   * renderHeader
   */
  renderHeader() {
    if ( !this.props.dateFormat )
      return null;

    let date = this.props.selectedDate || this.props.viewDate;

    return(
      <thead key="h">
        <tr>
          <th className="rdtSwitch" colSpan="4" onClick={this.props.showView( 'days' )}>{date.format( this.props.dateFormat )}</th>
        </tr>
      </thead>
    );
  }

  /**
   * onStartClicking
   * @param {String} action
   * @param {String} type
   */
  onStartClicking( action, type ) {
    let me = this;

    return function() {
      let update = {};
      update[ type ] = me[ action ]( type );
      me.setState( update );

      me.timer = setTimeout( function() {
        me.increaseTimer = setInterval( function() {
          update[ type ] = me[ action ]( type );
          me.setState( update );
        }, 70);
      }, 500);

      me.mouseUpListener = function() {
        clearTimeout( me.timer );
        clearInterval( me.increaseTimer );
        me.props.setTime( type, me.state[ type ] );
        document.body.removeEventListener( 'mouseup', me.mouseUpListener );
      };

      document.body.addEventListener( 'mouseup', me.mouseUpListener );
    };
  }

  /**
   * toggleDayPart
   * @param {String} type
   */
  toggleDayPart( type ) { // type is always 'hours'
    let value = parseInt( this.state[ type ], 10) + 12;
    if ( value > this.timeConstraints[ type ].max )
      value = this.timeConstraints[ type ].min + ( value - ( this.timeConstraints[ type ].max + 1 ) );
    return this.pad( type, value );
  }

  /**
   * increase
   * @param {String} type
   */
  increase( type ) {
    let value = parseInt( this.state[ type ], 10) + this.timeConstraints[ type ].step;
    if ( value > this.timeConstraints[ type ].max )
      value = this.timeConstraints[ type ].min + ( value - ( this.timeConstraints[ type ].max + 1 ) );
    return this.pad( type, value );
  }

  /**
   * decrease
   * @param {String} type
   */
  decrease( type ) {
    let value = parseInt( this.state[ type ], 10) - this.timeConstraints[ type ].step;
    if ( value < this.timeConstraints[ type ].min )
      value = this.timeConstraints[ type ].max + 1 - ( this.timeConstraints[ type ].min - value );
    return this.pad( type, value );
  }

  /**
   * pad
   * @param {String} type
   * @param {String} value
   */
  pad( type, value ) {
    let str = value + '';
    while ( str.length < this.padValues[ type ] )
      str = '0' + str;
    return str;
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
    let me = this;
    let counters = [];

    this.state.counters.forEach( function( c ) {
      if ( counters.length )
        counters.push(<div key={`sep${counters.length}`} className="rdtCounterSeparator">:</div>);
      counters.push( me.renderCounter( c ) );
    });

    if ( this.state.daypart !== false ) {
      counters.push( me.renderDayPart() );
    }

    if ( this.state.counters.length === 3 && this.props.timeFormat.indexOf( 'S' ) !== -1 ) {
      counters.push(<div key="sep5" className="rdtCounterSeparator">:</div>);
      counters.push(
        <div key="m" className="rdtCounter rdtMilli">
          <input type="text" value={this.state.milliseconds} onChange={this.updateMilli} />
        </div>
      );
    }

    return(
      <div className="rdtTime">
        <table>
          {this.renderHeader()}
          <tbody key="b">
            <tr>
              <td>
                <div className="rdtCounters">{counters}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default onClickOutside(DateTimePickerTime);
