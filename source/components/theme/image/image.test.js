import '../../../../internals/test/helper';
import Image from './index';

import { styles } from '@descco/ui-core';
const classes = styles.image;

/** @test {Image} */
describe('Image component', function() {
  /** @test {Image#render} */
  describe('#render', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Image path={'https://placeholdit.imgix.net/~text?txtsize=13&txt=image&w=100&h=100'} />
    );

    it('Should output an image', () => {
      assert.isOk(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'figure'));
    });

    it('Should output an image with default style', () => {
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(classes.left));
    });
  });
});
