import { progressBarShow, progressBarHide } from './progress-bar-actions';

const defaultTypeSuffixes = ['REQUEST', 'REQUEST_SUCCESS', 'REQUEST_FAILURE'];

export default function progressBarMiddleware(config = {}) {
  const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypeSuffixes;

  return ({ dispatch }) => next => (action) => {
    if (action.type) {
      const [REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE] = promiseTypeSuffixes;

      const isStart = new RegExp(`${REQUEST}$`, 'g');
      const isEnd = new RegExp(`${REQUEST_SUCCESS}$`, 'g');
      const isRejected = new RegExp(`${REQUEST_FAILURE}$`, 'g');

      if (action.type.match(isStart)) {
        dispatch(progressBarShow());
      } else if (action.type.match(isEnd) || action.type.match(isRejected)) {
        dispatch(progressBarHide());
      }
    }

    return next(action);
  };
}
