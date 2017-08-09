import { Map } from 'immutable';

const initialState = Map({
  modals: []
});

export default (state = initialState, action) => {
  switch (action.type) {
  case 'MODAL_SHOW':
    let newModal = {
      name: action.payload.name,
      id: action.payload.id,
      header: action.payload.header,
      body: action.payload.body,
      footer: action.payload.footer,
      actionButton: action.payload.actionButton,
      maxWidth: 600
    };

    return state.set('modals', state.get('modals').concat(newModal));

  case 'MODAL_HIDE':
    const modals = state.get('modals').filter((item) => item.id !== action.payload.id);
    return state.set('modals', modals);

  default:
    return state;
  }
};
