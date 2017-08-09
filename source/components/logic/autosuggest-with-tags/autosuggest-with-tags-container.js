import { connect } from 'react-redux';
import AutosuggestWithTags from './autosuggest-with-tags-component';
import {
  autosuggestWithTagsGetItems,
  autosuggestWithTagsAddItem,
  autosuggestWithTagsRemoveItem,
  autosuggestWithTagsGetField
} from './autosuggest-with-tags-actions';

const mapStateToProps = (state) => state.toJS().reducers.autosuggestWithTags;

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { reducerName, onChange } = ownProps;

  return {
    ...ownProps,
    ...stateProps,
    onGetItems: (items) => {
      dispatch(autosuggestWithTagsGetItems(reducerName, items));
    },
    onAddItem: (item) => {
      const items = stateProps[reducerName].items;
      items.push(item);

      dispatch(autosuggestWithTagsAddItem(reducerName, items));
      if(onChange) {
        onChange(reducerName, items);
      }
    },
    onGetField: (value) => {
      dispatch(autosuggestWithTagsGetField(reducerName, value));
    },
    onRemoveItem: (item) => {
      let itemsRemove = stateProps[reducerName].items;
      itemsRemove = itemsRemove.filter(it =>  it !== item);

      dispatch(autosuggestWithTagsRemoveItem(reducerName, itemsRemove));
      if(onChange) {
        onChange(reducerName, itemsRemove);
      }
    }
  };
};

export default connect(mapStateToProps, null, mergeProps)(AutosuggestWithTags);
