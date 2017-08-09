import '../../../../../internals/test/helper';
import Breadcrumb from './index';

import styles from './breadcrumb.scss';

/** @test {Breadcrumb} */
describe('Breadcrumb component', function() {
  /** @test {Breadcrumb#render} */
  describe('#render', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb>
        <Breadcrumb.Item text="teste 1"/>
      </Breadcrumb>
    );

    it('Should output a breadcrumb with one item', () => {
      assert.isOk(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'ol'));
    });

    it('Should output a breadcrumb with default style', () => {
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(styles['breadcrumb-list']));
    });
  });

  /** @test {Breadcrumb#Item} */
  describe('#Item', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb>
        <Breadcrumb.Item text="test 1" url="url test"/>
        <Breadcrumb.Item text="test 2"/>
      </Breadcrumb>
    );

    it('Should output a alert with items', () => {
      let breadcrumbItem = ReactTestUtils.scryRenderedComponentsWithType(instance, Breadcrumb.Item);
      assert.equal(breadcrumbItem.length, 2);
    });

    it('Should output a breadcrumb item with link type', () => {
      let breadcrumbItem = ReactTestUtils.scryRenderedComponentsWithType(instance, Breadcrumb.Item);
      assert.equal(breadcrumbItem[0].props.text, 'test 1');
      assert.equal(breadcrumbItem[0].props.url, 'url test');
      assert.isOk(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    });

    it('Should output a breadcrumb item with text', () => {
      let breadcrumbItem = ReactTestUtils.scryRenderedComponentsWithType(instance, Breadcrumb.Item);
      assert.equal(breadcrumbItem[1].props.text, 'test 2');
      assert.isOk(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
    });
  });
});
