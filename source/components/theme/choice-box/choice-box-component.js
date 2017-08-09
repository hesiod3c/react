import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
// components
import FormGroup from '../form-group';
import FormLabel from '../form-label';
import FormControl from '../form-control';
import Tag from '../tag';
import List from '../list';
import Button from '../button';
import Icon from '../icon';
//styles
import data from '../../../interface';
const styles = data.styles.choiceBox;

/**
 * ChoiceBox Component
 * @extends {PureComponent }
 * @class
 */
class ChoiceBox extends PureComponent {
  /**
   * defaultProps
   * @property {Function} onChange
   */
  static defaultProps = {
    options: [],
    tags: [],
    header: undefined,
    name: undefined,
    description: undefined,
    placeholder: undefined,
    onClick: () => {},
    tagString: false,
    onToggle: () => {},
    onRemove: () => {},
    onInputChange: () => {},
    create: true
  };

  /**
   * propTypes
   * @property {Function} getRef
   */
  static propTypes = {
    options: PropTypes.array,
    tags: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    header: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    placeholder: PropTypes.string,
    onClick: PropTypes.func,
    tagString: PropTypes.bool,
    onToggle: PropTypes.func,
    onRemove: PropTypes.func,
    onInputChange: PropTypes.func,
    create: PropTypes.bool
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { header, description, name, placeholder, onClick, options, tags, tagString, onToggle, onRemove, onDelete, onInputChange, allowCreate, allowDelete, validationState, errorMessage } = this.props;

    return (
      <div className={styles['choiceBox']}>
        <h3 className={styles['choiceBox-title']}>{header} {errorMessage &&  <span className={styles['errorMessage']}>{errorMessage}</span> }</h3>
        <h4 className={styles['choiceBox-description']}>{description}</h4>

        <FormGroup  validationState={validationState} className={classNames({ [styles['choiceBox-itemWithButton']]: allowCreate })}>
          <FormControl className={styles['choiceBox-formControl']} placeholder={placeholder} onChange={onInputChange} name={name} />
          { allowCreate &&
            <Button className={styles['choiceBox-itemWithButton-button']} style="primary" onClick={onClick}>
              <Icon name="plus" size="20px"/>
            </Button>
          }
        </FormGroup>

        <List className={styles['choiceBox-list']} style="bordered">
          {options.map((item, index) => {
            return (
              <List.Item key={index} className={classNames({ [styles['actived']] : item.checked })}>
                <FormGroup className={styles['choiceBox-formGroup']} style={tagString ? 'radio' : 'checkbox'}>
                  <FormControl type={tagString ? 'radio' : 'checkbox'}  name={tagString ? `choiceBox-${name}` : `choiceBox-${name}[]`} onChange={onToggle} checked={item.checked} value={item.slug} />
                  <FormLabel>{item.name}</FormLabel>
                  { allowDelete &&
                    <Button style="transparent" className={styles['choiceBox-formGroup-button']} onClick={onDelete.bind(this, name, item.id)}>
                      <Icon name="trash" color="#999999" />
                    </Button>
                  }
                </FormGroup>
              </List.Item>
            );
          })}
        </List>

        {!tagString && tags && tags.map((item, index) => {
          return (
            <Tag key={index} className={styles['choiceBox-tag']} onRemove={onRemove.bind(this, name, item)}>{item}</Tag>
          );
        })}

        {tagString && tags.length > 0 &&
        <Tag onRemove={onRemove.bind(this, name, tags)}>{tags}</Tag>
        }
      </div>
    );
  }
}

/**
 * @example <ChoiceBox />
 */
export default CSSModules(ChoiceBox, styles);


