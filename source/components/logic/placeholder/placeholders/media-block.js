import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import TextBlock from './text-block';
import RoundShape from './round-shape';
// style
import { styles } from '@descco/ui-core';
const classes = styles.placeholder;

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
    const fullClass = [classes.media, className].filter(c => c).join(' ');

    return (
      <div className={fullClass} style={{ ...style }}>
        <RoundShape
          className={classes['media-round']}
        />
        <TextBlock rows={rows} />
      </div>
    );
  }

}

export default CSSModules(MediaBlock, classes);
