import React, { PureComponent, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
//styles
import data from '../../../interface';
const styles = data.styles.progressBar;

/**
 * ProgressBar component
 * @extends {PureComponent }
 * @class
 */
class ProgressBar extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.simulateProgress = this.simulateProgress.bind(this);
    this.resetProgress = this.resetProgress.bind(this);
    this.launch = this.launch.bind(this);
    this.resetProgress = this.resetProgress.bind(this);
  }

  /**
   * defaultProps
   * @property {Number} updateTime
   * @property {Number} maxProgress
   * @property {Number} progressIncrease
   * @property {Number} animationTime
   */
  static defaultProps = {
    updateTime: 100,
    maxProgress: 100,
    progressIncrease: 5,
    animationTime: 100 * 2
  };

  /**
   * propTypes
   * @property {Object} style
   * @property {Number} updateTime
   * @property {Number} maxProgress
   * @property {Number} progressIncrease
   * @property {Number} animationTime
   */
  static propTypes = {
    style: PropTypes.object,
    loading: PropTypes.number,
    updateTime: PropTypes.number,
    maxProgress: PropTypes.number,
    progressIncrease: PropTypes.number
  };

  componentWillMount() {
    if (this.props.loading > 0) {
      this.launch();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading > this.props.loading) {
      this.launch();
    }
  }

  componentWillUnmount() {
    clearInterval(this.props.progressInterval);
    clearTimeout(this.props.animationTimeout);
  }

  /**
   * Launch
   */
  launch() {
    let { progressInterval, percent } = this.props;
    const { animationTimeout } = this.props;

    if (!progressInterval) {
      progressInterval = setInterval(
        this.simulateProgress,
        this.props.updateTime
      );
      clearTimeout(animationTimeout);
      percent = 0;
    }

    this.props.actions.progressBarLaunch(progressInterval, percent);
  }

  /**
   * simulateProgress
   */
  simulateProgress() {
    let { progressInterval, percent, animationTimeout } = this.props;

    if (percent === 100) {
      clearInterval(progressInterval);
      animationTimeout = setTimeout(this.resetProgress, this.props.animationTime);
      progressInterval = null;
    } else if (this.props.loading === 0) {
      percent = 100;
    } else if (percent < this.props.maxProgress) {
      percent += this.props.progressIncrease;
    }

    this.props.actions.progressBarSimulate(percent, progressInterval, animationTimeout);
  }

  /**
   * resetProgress
   */
  resetProgress() {
    this.props.actions.progressBarReset();
  }

  /**
   * buildStyle
   */
  buildStyle() {
    const style = {
      width: `${this.props.percent}%`,
      transition: `width ${this.props.animationTime}ms ease-out,
                   height ${this.props.animationTime}ms linear,
                   opacity ${this.props.animationTime}ms ease-out`,
      opacity: '1',
    };

    return { ...style, ...this.props.style };
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {

    const style = this.buildStyle();
    const rocketStyle = {
      left: `${this.props.percent}%`,
      transition: `left ${this.props.animationTime}ms ease-out`
    };

    const shouldShow = (this.props.percent > 0) && (this.props.percent < 100);
    if (shouldShow) {
      style.opacity = '1';
    } else {
      style.opacity = '0';
    }

    return (
      <div style={style} className={styles.progressBar}>
        <svg x="0" y="0" width="30.029" height="17.16" viewBox="0 0 60 34.286" style={rocketStyle} className={styles.rocket}>
          <g>
            <g>
              <polygon fill="#1a7563" points="5.458,23.233 3.01,21.587 3.01,12.479 5.458,11.656"/>
              <path fill="#1a7563" d="M7.864,8.489L0.844,0.225c0,0,13.708-0.793,17.957,0.603c2.058,0.676,7.056,4.884,7.056,4.884 s-6.688,0.471-8.873,0.808C14.671,6.877,7.864,8.489,7.864,8.489z"/>
              <path fill="#1a7563" d="M7.021,25.797L0,34.062c0,0,13.708,0.793,17.957-0.603c2.059-0.676,7.057-4.884,7.057-4.884 s-6.688-0.471-8.874-0.808C13.827,27.409,7.021,25.797,7.021,25.797z"/>
            </g>
            <path fill="#ffffff" d="M60,17.096c0,6.287-14.096,11.384-31.482,11.384c-9.006,0-18.015-0.38-23.01-3.812 C5.415,24.603,5.433,9.351,5.639,9.271c5.725-2.228,13.867-3.559,22.879-3.559C45.904,5.712,60,10.808,60,17.096z"/>
            <path fill="#ececed" d="M60,17.096c0,0,0.373,10.72-31.482,11.384c-9.003,0.188-18.015-0.38-23.01-3.812 c-0.093-0.065-0.262-7.282-0.048-7.223c6.703,1.866,15.02,2.602,24.03,2.602C46.877,20.047,60,17.096,60,17.096z"/>
          </g>
        </svg>
      </div>
    );
  }
}

/**
 * @example <ProgressBar />
 */
export default CSSModules(ProgressBar, styles);
