import '../../../../../internals/test/helper';
import ChoiceBox from './index';

import styles from './choice-box.scss';

/** @test {ChoiceBox} */
describe('ChoiceBox component', function() {
  /** @test {ChoiceBox#render} */
  describe('#render', () => {
    let noOp = () => {};
    let instance = ReactTestUtils.renderIntoDocument(
      <ChoiceBox
        header="Opções"
        description="várias opções"
        placeholder="Cadastre ou busque a opção"
        onClick={noOp}
        options={[{name:'label 1', slug:'label-1', checked: true}, {name:'label 2', slug:'label-2',}]}
        tags={['label-1']}
        onToggle={noOp}
        onRemove={noOp}
        onDelete={noOp}
        onInputChange={noOp}
        allowCreate={true}
        allowDelete={true}
      />
    );

    it('Should output a choice box', () => {
      let divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
      assert.equal(divs.length, 8);
    });

    it('Should output a choice box with default style', () => {
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(styles['choiceBox']));
    });
  });
});
