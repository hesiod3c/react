import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Icon component
 * @extends {PureComponent }
 * @class
 */
class Icon extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.IconPathLoader = this.IconPathLoader.bind(this);
  }

  /**
   * defaultProps
   * @property {size}
   * @property {name}
   */
  static defaultProps = {
    size: 16,
    name: 'user'
  };
  /**
   * propTypes
   * @property {String} name
   * @property {String} size
   * @property {String/Number} size
   * @property {String/Number} width
   * @property {String/Number} height
   * @property {Object} style
   */
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    style: PropTypes.object
  };

  IconPathLoader(name) {
    try {
      return require(`!!babel-loader!svg-react-loader!../../../../images/svg/icon/${name}.svg`);
    } catch (e) {
      return false;
    }
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    let styles = {
      fill: this.props.color,
      verticalAlign: 'middle',
      width: this.props.size, // CSS instead of the width attr to support non-pixel units
      height: this.props.size // Prevents scaling issue in IE
    };

    const { name, ...elementProps} = this.props;
    const Component = this.IconPathLoader(name);

    if (!Component) {
      return null;
    }

    return <Component style={styles} {...elementProps}/>;
  }
}

/**
 * @example <Icon />
 */
export default Icon;
