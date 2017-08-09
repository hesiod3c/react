import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import List from '../../theme/list';
import Icon from '../../theme/icon';
import Button from '../../theme/button';
//styles
import data from '../../../interface';
const styles = data.styles.transfer;

/**
 * Transfer Component
 * @extends {PureComponent }
 * @class
 */
class Transfer extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  /**
   * defaultProps
   * @property {Array} items
   * @property {Array} filtered
   * @property {String} reducerName
   * @property {String} listTitle
   * @property {String} filteredListTitle
   * @property {Function} onChange
   */
  static defaultProps = {
    items: [],
    filtered: [],
    reducerName: 'list',
    listTitle: 'Lista de itens',
    filteredListTitle: 'Itens escolhidos',
    onChange: () => {}
  };

  /**
   * propTypes
   * @property {Array} items
   * @property {Array} filtered
   * @property {String} reducerName
   * @property {String} listTitle
   * @property {String} filteredListTitle
   * @property {Function} onChange
   */
  static propTypes = {
    items: PropTypes.array,
    filtered: PropTypes.array,
    reducerName: PropTypes.string,
    listTitle: PropTypes.string,
    filteredListTitle: PropTypes.string,
    onChange: PropTypes.func
  };

  componentWillMount() {
    this.props.onGetItems(this.props.items, this.props.filtered);
  }

  /**
   * addItem
   */
  addItem() {
    this.props.onAddItems();
  }

  /**
   * removeItem
   */
  removeItem() {
    this.props.onRemoveItems();
  }

  /**
   * selectItem
   * @property {Object} item
   * @property {String} type
   */
  selectItem(item, type) {
    this.props.onSelectItem(item, type);
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { list, filteredList, addItems, removeItems } = this.props[this.props.reducerName] || { list: [], filteredList: [], addItems: [], removeItems: [] };

    return (
      <div className={styles.transfer}>
        <div className={styles['transfer-box']}>
          <h3 className={styles['transfer-title']}>{ this.props.listTitle }</h3>
          <List className={styles['transfer-list']} style="bordered">
            { list.map((item, index) => {
              return (
                <List.Item
                  key={index}
                  onClick={this.selectItem.bind(this, item, 'add')}
                  className={classNames( styles['transfer-item'], { [styles.on]: item.selected })}
                >
                  { item.label }
                </List.Item>
              );
            })
            }
          </List>
        </div>

        <div className={styles['transfer-operator']}>
          <div>
            <Button
              onClick={this.addItem}
              disabled={addItems.length === 0}
              className={styles['transfer-operator-button']}
              style="primary"
            >
              <Icon name="arrow-right" />
            </Button>
          </div>
          <div>
            <Button
              onClick={this.removeItem}
              disabled={removeItems.length === 0}
              className={styles['transfer-operator-button']}
              style="primary"
            >
              <Icon name="arrow-left" />
            </Button>
          </div>
        </div>

        <div className={styles['transfer-box']}>
          <h3 className={styles['transfer-title']}>{ this.props.filteredListTitle }</h3>
          <List className={styles['transfer-list']} style="bordered">
            { filteredList.map((item, index) => {
              return (
                <List.Item
                  key={index}
                  onClick={this.selectItem.bind(this, item, 'remove')}
                  className={classNames( styles['transfer-item'], { [styles.on]: item.selected })}
                >
                  { item.label }
                </List.Item>
              );
            })
            }
          </List>
        </div>
      </div>
    );
  }
}

/**
 * @example <Transfer />
 */
export default CSSModules(Transfer, styles);


