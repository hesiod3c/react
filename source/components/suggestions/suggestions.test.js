import '../../../internals/test/helper';
import Suggestions from './index';

import { styles } from '@descco/ui-core';
const classes = styles.suggestions;

/** @test {Suggestions} */
describe('Suggestions component', function() {
  /** @test {Suggestions#render} */
  describe('#render', () => {
    const suggestions = [
      {id: 1, name: 'test_1'},
      {id: 2, name: 'example_2'},
      {id: 3, name: 'example_3'},
      {id: 4, name: 'test_4'},
      {id: 5, name: 'example_5'},
      {id: 6, name: 'example_6'},
      {id: 7, name: 'teste_7'},
      {id: 8, name: 'example_8'},
      {id: 9, name: 'example_9'},
      {id: 10, name: 'example_10'}
    ];

    let instance = ReactTestUtils.renderIntoDocument(
      <Suggestions
        listboxId={'reactTags-listbox'}
        expandable={true}
        suggestions={suggestions}
        query={'example'}
        addTag={() => {}}
        maxSuggestionsLength={6}
      />
    );

    it('Should output a suggestion', () => {
      let divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'ul');
      assert.equal(divs.length, 1);
    });

    it('Should output a suggestion with default style', () => {
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(classes.suggestions));
    });
  });
});
