import '../../../../internals/test/helper';
import Panel from './index';

import { styles } from '@descco/ui-core';
const classes = styles.panel;

/** @test {Panel} */
describe('Panel component', function() {
  /** @test {Panel#render} */
  describe('#render', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel>Test</Panel>
    );

    it('Should output a panel', () => {
      assert.isOk(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'section'));
    });

    it('Should output a panel with default style', () => {
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(classes.panel));
    });
  });
});
