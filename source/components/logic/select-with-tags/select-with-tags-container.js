import { connect } from 'react-redux';
import SelectWithTags from './select-with-tags-component';
import {
  selectWithTagsGetItems,
  selectWithTagsAddItem,
  selectWithTagsRemoveItem
} from './select-with-tags-actions';

const mapStateToProps = (state) => state.toJS().reducers.selectWithTags;

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { reducerName, onChange } = ownProps;

  return {
    ...ownProps,
    ...stateProps,
    onGetItems: (items) => {
      dispatch(selectWithTagsGetItems(reducerName, items));
    },
    onAddItem: (item) => {
      const items = stateProps[reducerName].items;
      let count = 0;

      items.map(it => {
        if(it.value === item.value) {
          count++;
        }
      });

      if(count === 0) {
        items.push(item);

        dispatch(selectWithTagsAddItem(reducerName, items));
        if(onChange) {
          onChange(reducerName, items);
        }
      }
    },
    onRemoveItem: (item) => {
      let itemsRemove = stateProps[reducerName].items;
      itemsRemove = itemsRemove.filter(it =>  it !== item);

      dispatch(selectWithTagsRemoveItem(reducerName, itemsRemove));
      if(onChange) {
        onChange(reducerName, itemsRemove);
      }
    }
  };
};

export default connect(mapStateToProps, null, mergeProps)(SelectWithTags);
