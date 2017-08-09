import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
//styles
import { styles } from '@descco/ui-core';
const classes = styles.suggestions;

function markIt (input, query) {
  const escaped = query.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = RegExp(escaped, 'gi');

  return {
    __html: input.replace(regex, '<mark>$&</mark>')
  };
}

function filterSuggestions (query, suggestions, length) {
  const regex = new RegExp(`\\b${query}`, 'i');
  return suggestions.filter((item) => regex.test(item.name)).slice(0, length);
}

/**
 * Suggestions component
 * @extends {PureComponent }
 * @class
 */
class Suggestions extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      options: filterSuggestions(this.props.query, this.props.suggestions, this.props.maxSuggestionsLength)
    };

    this._generateOptions = this._generateOptions.bind(this);
  }

  /**
   * defaultProps
   * @property {Boolean} children
   */
  static defaultProps = {
    suggestions: []
  };

  /**
   * propTypes
   * @property {Array} options
   */
  static propTypes = {
    suggestions: PropTypes.array.isRequired
  };

  componentWillReceiveProps (newProps) {
    this.setState({
      options: filterSuggestions(newProps.query, newProps.suggestions, newProps.maxSuggestionsLength)
    });
  }

  /**
   * _generateOptions
   */
  _generateOptions(item, index){
    const key = `${this.props.listboxId}-${index}`;

    const fullClass = classNames({
      [classes['is-active']]: this.props.selectedIndex === index,
      [classes['is-disabled']]: item.disabled
    });

    return (
      <li
        id={key}
        key={key}
        role='option'
        className={fullClass}
        aria-disabled={item.disabled === true}
        onMouseDown={() => this.props.addTag(item)}>
        <span dangerouslySetInnerHTML={markIt(item.name, this.props.query)} />
      </li>
    );
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { expandable } = this.props;

    if (!expandable || !this.state.options.length) {
      return null;
    }

    let items = this.state.options.map(this._generateOptions);

    return (
      <div className={classes.suggestions}>
        <ul className={classes['suggestions-list']} role='listbox' id={this.props.listboxId}>{items}</ul>
      </div>
    );
  }
}

/**
 * @example <Suggestions />
 */
export default CSSModules(Suggestions, classes);


