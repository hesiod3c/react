import { Map } from 'immutable';

const initialState = Map({});

export default (state = initialState, action) => {

  if(typeof action.payload === 'undefined') {
    action.payload = {};
    action.payload.reducerName = '';
    action.payload.items = [];
    action.payload.item = '';
  }

  const REDUCER_NAME = action.payload.reducerName ? action.payload.reducerName.toUpperCase() : '';
  const reducerName = action.payload.reducerName;

  switch (action.type) {
  case `AUTOSUGGEST_WITH_TAGS_GET_ITEMS_OF_${REDUCER_NAME}`:
    const initial = {};
    initial[reducerName] = { items: action.payload.items || [], item: '' };
    return state.merge(state, initial);

  case `AUTOSUGGEST_WITH_TAGS_GET_FIELD_OF_${REDUCER_NAME}`:
    const get = {};
    get[reducerName] = {
      items: state.toJS()[reducerName].items,
      item: action.payload.value
    };
    return state.merge(state, get);

  case `AUTOSUGGEST_WITH_TAGS_ADD_ITEM_OF_${REDUCER_NAME}`:
    const add = {};
    add[reducerName] = {
      items: action.payload.items,
      item: ''
    };
    return state.merge(state, add);

  case `AUTOSUGGEST_WITH_TAGS_REMOVE_ITEM_OF_${REDUCER_NAME}`:
    const remove = {};
    remove[reducerName] = {
      items: action.payload.items,
      item: state.toJS()[reducerName].item
    };
    return state.merge(state, remove);

  default:
    return state;
  }
};

