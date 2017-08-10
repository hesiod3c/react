import '../../../internals/test/helper';
import FormActions from './index';

import { styles } from '@descco/ui-core';
const classes = styles.formActions;

/** @test {FormActions} */
describe('FormActions component', function() {
  /** @test {FormActions#render} */
  describe('#render', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormActions></FormActions>
    );

    it('Should output a form actions', () => {
      assert.isOk(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'div'));
    });

    it('Should output a form actions with default style', () => {
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(classes['form-group-actions']));
    });
  });
});
