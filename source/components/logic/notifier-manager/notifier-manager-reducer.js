import { Map } from 'immutable';

const initialState = Map({
  notifiers: []
});

export default (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFIER_SHOW':
    let newNotifier = {
      name: action.payload.name,
      id: `${(new Date()).getTime()}`,
      type: action.payload.type,
      headline: action.payload.headline,
      message: action.payload.message
    };

    return state.set('notifiers', state.get('notifiers').concat(newNotifier));

  case 'NOTIFIER_HIDE':
    const notifiers = state.get('notifiers').filter((item) => item.id !== action.payload.id);
    return state.set('notifiers', notifiers);
  default:
    return state;
  }
};
