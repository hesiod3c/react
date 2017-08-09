import { Map } from 'immutable';

const initialState = Map({
  percent: 0,
  progressInterval: null,
  animationTimeout: null,
  loading: 0,
  style: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
  case 'PROGRESS_BAR_SHOW':
    return state.merge({
      loading: state.get('loading') + 1
    });
  case 'PROGRESS_BAR_HIDE':
    return state.merge({
      loading: state.get('loading') > 0 ? state.get('loading') - 1 : 0,
      percent: 0
    });
  case 'PROGRESS_BAR_RESET':
    return state.merge({
      loading: 0,
      percent: 0
    });
  case 'PROGRESS_BAR_LAUNCH':
    return state.merge({
      progressInterval: action.payload.progressInterval,
      percent: action.payload.percent
    });
  case 'PROGRESS_BAR_SIMULATE':
    return state.merge({
      percent: action.payload.percent,
      progressInterval: action.payload.progressInterval,
      animationTimeout: action.payload.animationTimeout
    });
  default:
    return state;
  }
};
