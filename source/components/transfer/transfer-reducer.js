import { Map } from 'immutable';

const initialState = Map({});

export default (state = initialState, action) => {

  if(typeof action.payload === 'undefined') {
    action.payload = {};
    action.payload.reducerName = '';
    action.payload.list = [];
    action.payload.filteredList = [];
    action.payload.addItems = [];
    action.payload.removeItems = [];
  }

  const REDUCER_NAME = action.payload.reducerName ? action.payload.reducerName.toUpperCase() : '';
  const reducerName = action.payload.reducerName;

  switch (action.type) {
  case `TRANSFER_GET_ITEMS_OF_${REDUCER_NAME}`:
    action.payload.list = action.payload.list || [];
    action.payload.filteredList = action.payload.filteredList || [];
    action.payload.addItems = [];
    action.payload.removeItems = [];

    return state.set(reducerName, action.payload);
  case `TRANSFER_SELECT_ITEM_OF_${REDUCER_NAME}`:
    return state.set(reducerName, {
      list: action.payload.list,
      filteredList: action.payload.filteredList,
      addItems: action.payload.addItems,
      removeItems: action.payload.removeItems
    });
  case `TRANSFER_ADD_ITEMS_OF_${REDUCER_NAME}`:
    return state.set(reducerName, {
      list: action.payload.list,
      filteredList: action.payload.filteredList,
      addItems: [],
      removeItems: []
    });
  case `TRANSFER_REMOVE_ITEMS_OF_${REDUCER_NAME}`:
    return state.set(reducerName, {
      list: action.payload.list,
      filteredList: action.payload.filteredList,
      addItems: [],
      removeItems: []
    });
  default:
    return state;
  }
};

