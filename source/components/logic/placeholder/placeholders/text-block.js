import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
// style
import styles from '../../../../../scss/06-components/placeholder.scss';

import TextRow from './text-row';

const widths = [97, 100, 94, 90, 98, 95, 98, 40];

class TextBlock extends PureComponent {
  /**
   * constructor
   * @property {Object} props
   */
  constructor(props) {
    super(props);

    this.getRowStyle = this.getRowStyle.bind(this);
    this.getRows = this.getRows.bind(this);
  }

  /**
   * propTypes
   * @property {Number} rows
   * @property {Number/String} lineSpacing
   * @property {Object} style
   * @property {String} className
   */
  static propTypes = {
    rows: PropTypes.number.isRequired,
    lineSpacing: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    style: PropTypes.object,
    className: PropTypes.string
  };

  getRowStyle(i) {
    const { rows } = this.props;

    return {
      maxHeight: `${(100 / (rows * 2 - 1))}%`,
      width: `${widths[(i + widths.length) % widths.length]}%`
    };
  }

  getRows() {
    const { rows, lineSpacing } = this.props;
    const range = Array.apply(null, { length: rows }); // eslint-disable-line prefer-spread
    return range.map((x, i) => (
      <TextRow
        style={this.getRowStyle(i)}
        lineSpacing={i !== 0 ? lineSpacing : 0}
        key={i}
      />
    ));
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { style, className } = this.props;

    const classes = [styles.textBlock, className].filter(c => c).join(' ');

    return (
      <div className={classes} style={{ ...style }}>
        {this.getRows()}
      </div>
    );
  }

}

export default CSSModules(TextBlock, styles);
