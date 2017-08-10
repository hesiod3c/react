import '../../../internals/test/helper';
import GridRow from './index';

import { styles } from '@descco/ui-core';
const classes = styles.gridRow;

/** @test {GridRow} */
describe('GridRow component', function() {
  /** @test {GridRow#render} */
  describe('#render', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <GridRow></GridRow>
    );

    it('Should output a grid row', () => {
      assert.isOk(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'div'));
    });

    it('Should output a grid row with default style', () => {
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(classes['row']));
    });
  });
});
