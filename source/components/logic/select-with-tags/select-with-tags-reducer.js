import { Map } from 'immutable';

const initialState = Map({});

export default (state = initialState, action) => {

  if(typeof action.payload === 'undefined') {
    action.payload = {};
    action.payload.reducerName = '';
    action.payload.items = [];
  }

  const REDUCER_NAME = action.payload.reducerName ? action.payload.reducerName.toUpperCase() : '';
  const reducerName = action.payload.reducerName;

  switch (action.type) {
  case `SELECT_WITH_TAGS_GET_ITEMS_OF_${REDUCER_NAME}`:
    const initial = {};
    initial[reducerName] = { items: action.payload.items || [] };
    return state.merge(state, initial);

  case `SELECT_WITH_TAGS_ADD_ITEM_OF_${REDUCER_NAME}`:
    const add = {};
    add[reducerName] = {
      items: action.payload.items
    };
    return state.merge(state, add);

  case `SELECT_WITH_TAGS_REMOVE_ITEM_OF_${REDUCER_NAME}`:
    const remove = {};
    remove[reducerName] = {
      items: action.payload.items
    };
    return state.merge(state, remove);

  default:
    return state;
  }
};

