import '../../../internals/test/helper';
import FormControl from './index';

import { styles } from '@descco/ui-core';
const classes = styles.formControl;

/** @test {FormControl} */
describe('FormControl component', function() {
  /** @test {FormControl#render} */
  describe('#render', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormControl></FormControl>
    );

    it('Should output a form control', () => {
      assert.isOk(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'div'));
    });

    it('Should output a form control with default style', () => {
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(classes['form-addon']));
    });
  });
});
