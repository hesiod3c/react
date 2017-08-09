import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProgressBar from './progress-bar-component';
import * as actions from './progress-bar-actions';

const mapStateToProps = (state) => {
  const progressBar = state.toJS().reducers.progressBar;

  return {
    percent: progressBar.percent,
    progressInterval: progressBar.progressInterval,
    animationTimeout: progressBar.animationTimeout,
    loading: progressBar.loading,
    style: progressBar.style
  };
};

const mapDispatchToProps = (dispatch) => {
  const actionCreators = {
    dispatch,
    ...actions
  };

  return { actions: bindActionCreators(actionCreators, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);
