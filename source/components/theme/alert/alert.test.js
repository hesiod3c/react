import '../../../../../internals/test/helper';
import Alert from './index';
import Icon from '../icon';

import styles from './alert.scss';

/** @test {Alert} */
describe('Alert component', function() {
  /** @test {Alert#render} */
  describe('#render', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert><p>Teste</p></Alert>
    );

    it('Should output a alert with message', () => {
      assert.isOk(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'p'));
    });

    it('Should output a alert with default style', () => {
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(styles.info));
    });
  });

  /** @test {Alert#style} */
  describe('#style', () => {
    it('Should have a alert with success style', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Alert type="success"><p>Teste</p></Alert>
      );
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(styles.success));
    });

    it('Should have a alert with warning style', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Alert type="warning"><p>Teste</p></Alert>
      );
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(styles.warning));
    });

    it('Should have a alert with danger style', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Alert type="danger"><p>Teste</p></Alert>
      );
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(styles.danger));
    });
  });

  /** @test {Alert#icon} */
  describe('#icon', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert showIcon><p>Teste</p></Alert>
    );

    it('Should output a alert with icon', () => {
      let icon = ReactTestUtils.scryRenderedComponentsWithType(instance, Icon);
      assert.equal(icon.length, 1);
    });

    it('Should have className', () => {
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(styles['alert--icon']));
    });

    it('Should output a alert with icon and default style', () => {
      let icon = ReactTestUtils.findRenderedComponentWithType(instance, Icon);
      assert.equal(icon.props.name, 'info-circle');
    });
  });

  /** @test {Alert#dismiss} */
  describe('#dismiss', () => {
    let noOp = () => {};
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert onDismiss={noOp}>
        <p>Teste</p>
      </Alert>
    );

    it('Should output a alert with onDismiss', () => {
      assert.isOk(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button'));
    });

    it('Should have dismissable style with onDismiss', () => {
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(styles.dismissable));
    });
  });

  /** @test {Alert#dark} */
  describe('#dark', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert dark>
        <p>Teste</p>
      </Alert>
    );

    it('Should have dark style', () => {
      assert.isOk(ReactDOM.findDOMNode(instance).className.match(styles['alert--dark']));
    });
  });

  /** @test {Alert#action} */
  describe('#action', () => {
    it('Should call onDismiss callback on dismiss click', (done) => {
      let doneOp = () => {
        done();
      };
      let instance = ReactTestUtils.renderIntoDocument(
        <Alert onDismiss={doneOp}>
          <p>Message</p>
        </Alert>
      );
      ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance).children[0]);
    });
  });

  /** @test {Alert#headline} */
  describe('#headline', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert headline="Teste">
        <p>Testando</p>
      </Alert>
    );

    it('Should output a alert with headline', () => {
      assert.isOk(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'h4'));
    });
  });
});
