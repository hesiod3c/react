import '../../../../../internals/test/helper';
import Footer from './index';

/** @test {Footer} */
describe('Footer component', function() {

/** @test {Footer#render} */
  describe('#render', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Footer />
    );

    it('Should output a footer', () => {
      assert.isOk(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'footer'));
    });
  });

});
