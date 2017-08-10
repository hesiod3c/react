import {
  PROGRESS_BAR_SHOW,
  PROGRESS_BAR_HIDE,
  PROGRESS_BAR_RESET,
  PROGRESS_BAR_SIMULATE,
  PROGRESS_BAR_LAUNCH
} from './progress-bar-constants';

export function progressBarShow() {
  return {
    type: PROGRESS_BAR_SHOW,
  };
}

export function progressBarHide() {
  return {
    type: PROGRESS_BAR_HIDE,
  };
}

export function progressBarReset() {
  return {
    type: PROGRESS_BAR_RESET,
  };
}

export function progressBarLaunch(progressInterval, percent) {
  return {
    type: PROGRESS_BAR_LAUNCH,
    payload: {
      progressInterval,
      percent
    }
  };
}

export function progressBarSimulate(percent, progressInterval, animationTimeout) {
  return {
    type: PROGRESS_BAR_SIMULATE,
    payload: {
      percent,
      progressInterval,
      animationTimeout
    }
  };
}
