import { Map } from 'immutable';

const initialState = Map({
  modal: []
});

export default (state = initialState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};
