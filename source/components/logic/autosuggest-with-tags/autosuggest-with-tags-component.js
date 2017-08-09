import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
// components
import FormGroup from '../../theme/form-group';
import FormControl from '../../theme/form-control';
import Tag from '../../theme/tag';
import Button from '../../theme/button';
import Icon from '../../theme/icon';
import Suggestions from '../../theme/suggestions';
// style
import { styles } from '@descco/ui-core';
const classes = styles.autosuggestWithTags;

/**
 * AutosuggestWithTags Component
 * @extends {PureComponent }
 * @class
 */
class AutosuggestWithTags extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  /**
   * defaultProps
   * @property {Array} items
   */
  static defaultProps = {
    tags: [],
    reducerName: 'list',
    placeholder: undefined,
    validationState: undefined,
    onChange: () => {}
  };

  /**
   * propTypes
   * @property {Array} items
   */
  static propTypes = {
    tags: PropTypes.array,
    reducerName: PropTypes.string,
    placeholder: PropTypes.string,
    validationState: PropTypes.string,
    onChange: PropTypes.func
  };

  componentWillMount() {
    this.props.onGetItems(this.props.tags);
  }

  onAdd(item) {
    this.props.onAddItem(item);
  }

  onRemove(item) {
    this.props.onRemoveItem(item);
  }

  onInputChange(event) {
    const { value } = event.target;
    this.props.onGetField(value);
  }

  onInputKeyDown(event) {
    const ENTER = event.keyCode === 13;
    const TAB = event.keyCode === 9;

    if (ENTER || TAB) {
      this.onCreate();
    }
  }

  onCreate() {
    const { item } = this.props[this.props.reducerName] || { item: '' };
    if(item !== ''){
      const created = {
        id: item,
        name: item
      };
      this.props.onAddItem(created);
    }
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { name, placeholder, validationState, reducerName, options } = this.props;
    const { items, item } = this.props[reducerName] || { items: [], item: '' };

    const keyDown = !options ? this.onInputKeyDown : undefined;

    return (
      <div className={classes['autoSuggestWithTags']}>
        <FormGroup
          validationState={validationState}
          className={classNames(classes['autoSuggestWithTags-formGroup'], { [classes['autoSuggestWithTags-itemWithButton']]: !options })}
        >
          <FormControl
            className={classes['autoSuggestWithTags-formControl']}
            placeholder={placeholder}
            onChange={this.onInputChange}
            onKeyDown={keyDown}
            name={name}
            value={item}
          />
          { !options &&
          <Button
            className={classes['autoSuggestWithTags-itemWithButton-button']}
            style="primary"
            onClick={this.onCreate}
          >
            <Icon name="plus" size="20px"/>
          </Button>
          }
          { options &&
            <Suggestions
              listboxId={'reactTags-listbox'}
              expandable={item.length >= 3}
              suggestions={options}
              query={item}
              addTag={this.onAdd}
              maxSuggestionsLength={6}/>
          }
        </FormGroup>

        { items.map((item, index) => {
          return (
            <Tag key={index} className={classes['autoSuggestWithTags-tag']} onRemove={this.onRemove.bind(this, item)}>{item.name}</Tag>
          );
        })}
      </div>
    );
  }
}

/**
 * @example <AutosuggestWithTags />
 */
export default CSSModules(AutosuggestWithTags, classes);
