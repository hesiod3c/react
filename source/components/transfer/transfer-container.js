import { connect } from 'react-redux';
import Transfer from './transfer-component';
import {
  transferSelectItem,
  transferGetItems,
  transferAddItems,
  transferRemoveItems
} from './transfer-actions';

const mapStateToProps = (state, ownProps) => {
  const reducer = {};
  reducer[ownProps.reducerName] = state.toJS().reducers.transfer[ownProps.reducerName];
  return reducer;
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    onGetItems: (items, filtered) => {
      dispatch(transferGetItems(ownProps.reducerName, items, filtered));
    },
    onSelectItem: (item, type) => {
      let items = type === 'add' ? stateProps[ownProps.reducerName].addItems : stateProps[ownProps.reducerName].removeItems ;
      let isExists = false;
      let list = stateProps[ownProps.reducerName].list;
      let filteredList = stateProps[ownProps.reducerName].filteredList;

      items = items.map((it) => {
        if(it.value === item.value) {
          isExists = true;
          it.selected = false;
          if(type === 'add') {
            list = list.map((listItem) => {
              if(listItem.value === item.value) {
                listItem.selected = false;
              }

              return listItem;
            });
          } else {
            filteredList = filteredList.map((listItem) => {
              if(listItem.value === item.value) {
                listItem.selected = false;
              }

              return listItem;
            });
          }
        }
        return it;
      });

      if(isExists){
        items = items.filter(filtered => filtered.value !== item.value);
      } else {
        item.selected = true;
        items.push(item);
      }

      const addItems = type === 'add' ? items : [];
      const removeItems = type === 'remove' ? items : [];

      dispatch(transferSelectItem(ownProps.reducerName, addItems, removeItems, list, filteredList));
    },
    onAddItems: () => {
      const items = stateProps[ownProps.reducerName].addItems.map((item) => {
        return item.value;
      });
      const list = stateProps[ownProps.reducerName].list.filter((item) => {
        return items.indexOf(item.value) === -1;
      });

      const addItems = stateProps[ownProps.reducerName].addItems.map(item => {
        item.selected = false;
        return item;
      });

      let filteredList = stateProps[ownProps.reducerName].filteredList;
      filteredList = filteredList.concat(addItems).map(it => {
        it.selected = false;
        return it;
      });

      dispatch(transferAddItems(ownProps.reducerName, list, filteredList));
      if(ownProps.onChange) {
        ownProps.onChange(ownProps.reducerName, filteredList);
      }
    },
    onRemoveItems: () => {
      const items = stateProps[ownProps.reducerName].removeItems.map((item) => {
        return item.value;
      });
      const filteredList = stateProps[ownProps.reducerName].filteredList.filter((item) => {
        return items.indexOf(item.value) === -1;
      });
      const removeItems = stateProps[ownProps.reducerName].removeItems.map(item => {
        item.selected = false;
        return item;
      });

      let list = stateProps[ownProps.reducerName].list;
      list = list.concat(removeItems).map(it => {
        it.selected = false;
        return it;
      });

      dispatch(transferRemoveItems(ownProps.reducerName, list, filteredList));
      if(ownProps.onChange){
        ownProps.onChange(ownProps.reducerName, filteredList);
      }
    }
  };
};

export default connect(mapStateToProps, null, mergeProps)(Transfer);
