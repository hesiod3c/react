import '../../../../../internals/test/helper';
import Pagination from './index';

import styles from './pagination.scss';

/** @test {Pagination} */
describe('Pagination component', function() {
  /** @test {Pagination#render} */
  describe('#render', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        activePage={1}
        itemsCountPerPage={10}
        totalItemsCount={200}
      />
    );

    it('Should output a pagination', () => {
      assert.isOk(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'ul'));
    });

    it('Should output a pagination with default style', () => {
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(styles.pagination));
    });
  });
});
