import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import TextBlock from './text-block';
import RoundShape from './round-shape';
// style
import styles from '../../../../../scss/06-components/placeholder.scss';

class MediaBlock extends PureComponent {
  /**
   * propTypes
   * @property {Number} rows
   * @property {Object} style
   * @property {String} className
   */
  static propTypes = {
    rows: PropTypes.number.isRequired,
    style: PropTypes.object,
    className: PropTypes.string
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { className, style, rows } = this.props;
    const classes = [styles.media, className].filter(c => c).join(' ');

    return (
      <div className={classes} style={{ ...style }}>
        <RoundShape
          className={styles['media-round']}
        />
        <TextBlock rows={rows} />
      </div>
    );
  }

}

export default CSSModules(MediaBlock, styles);
