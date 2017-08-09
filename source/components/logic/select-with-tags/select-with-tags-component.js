import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
// components
import FormGroup from '../../theme/form-group';
import FormControl from '../../theme/form-control';
import Tag from '../../theme/tag';
//styles
import data from '../../../interface';
const styles = data.styles.selectWithTags;

/**
 * SelectWithTags Component
 * @extends {PureComponent }
 * @class
 */
class SelectWithTags extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
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

  onAdd(event) {
    const { value } = event.target;
    if(value !== '') {
      const id = event.nativeEvent.target.selectedIndex;
      const label = event.nativeEvent.target[id].text;
      this.props.onAddItem({ label: label, value: value});
    }
  }

  onRemove(item) {
    this.props.onRemoveItem(item);
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { name, placeholder, validationState, reducerName, options } = this.props;
    const { items, item } = this.props[reducerName] || { items: [], item: '' };

    return (
      <div className={styles['selectWithTags']}>
        <FormGroup
          validationState={validationState}
          className={styles['selectWithTags-formGroup']}
        >
          <FormControl
            type="select"
            className={styles['selectWithTags-formControl']}
            placeholder={placeholder}
            onChange={this.onAdd}
            name={name}
            value={item}
          >
            { options.map(item => {
              return (
                <option value={item.value}>{item.label}</option>
              );
            })
            }
          </FormControl>
        </FormGroup>

        { items.map((item, index) => {
          return (
            <Tag
              key={index}
              className={styles['selectWithTags-tag']}
              onRemove={this.onRemove.bind(this, item)}
            >
              {item.label}
            </Tag>
          );
        })}
      </div>
    );
  }
}

/**
 * @example <SelectWithTags />
 */
export default CSSModules(SelectWithTags, styles);
