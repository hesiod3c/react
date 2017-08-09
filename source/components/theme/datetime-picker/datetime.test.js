import '../../../../../internals/test/helper';
import DatetimePicker from './index';

import styles from './datetime-picker.scss';

/** @test {DatetimePicker} */
describe('DatetimePicker component', function() {
  /** @test {DatetimePicker#render} */
  describe('#render', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <DatetimePicker
        dateFormat={'DD/MM/YYYY'}
        timeFormat={'H:mm'}
        locale="pt-br"
      />
    );

    it('Should output a datetime picker', () => {
      let divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
      assert.equal(divs.length, 4);
    });

    it('Should output a button with default style', () => {
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(styles.rdt));
    });
  });
});
