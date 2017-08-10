import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
// components
import FormGroup from '../form-group/index';
import FormLabel from '../form-label/index';
import FormControl from '../form-control/index';
import Tag from '../tag/index';
import List from '../list/index';
import Button from '../button';
import Icon from '../icon/index';
//styles
import { styles } from '@descco/ui-core';
const classes = styles.choiceBox;

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
    create: true,
    onDelete: () => {},
    allowCreate: false,
    allowDelete: false,
    validationState: undefined,
    errorMessage: undefined
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
    create: PropTypes.bool,
    onDelete: PropTypes.func,
    allowCreate: PropTypes.bool,
    allowDelete: PropTypes.bool,
    validationState: PropTypes.string,
    errorMessage: PropTypes.string
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { header, description, name, placeholder, onClick, options, tags, tagString, onToggle, onRemove, onDelete, onInputChange, allowCreate, allowDelete, validationState, errorMessage } = this.props;

    return (
      <div className={classes['choiceBox']}>
        <h3 className={classes['choiceBox-title']}>{header} {errorMessage &&  <span className={classes['errorMessage']}>{errorMessage}</span> }</h3>
        <h4 className={classes['choiceBox-description']}>{description}</h4>

        <FormGroup  validationState={validationState} className={classNames({ [classes['choiceBox-itemWithButton']]: allowCreate })}>
          <FormControl className={classes['choiceBox-formControl']} placeholder={placeholder} onChange={onInputChange} name={name} />
          { allowCreate &&
            <Button className={classes['choiceBox-itemWithButton-button']} style="primary" onClick={onClick}>
              <Icon name="plus" size="20px"/>
            </Button>
          }
        </FormGroup>

        <List className={classes['choiceBox-list']} style="bordered">
          {options.map((item, index) => {
            return (
              <List.Item key={index} className={classNames({ [classes['actived']] : item.checked })}>
                <FormGroup className={classes['choiceBox-formGroup']} style={tagString ? 'radio' : 'checkbox'}>
                  <FormControl type={tagString ? 'radio' : 'checkbox'}  name={tagString ? `choiceBox-${name}` : `choiceBox-${name}[]`} onChange={onToggle} checked={item.checked} value={item.slug} />
                  <FormLabel>{item.name}</FormLabel>
                  { allowDelete &&
                    <Button style="transparent" className={classes['choiceBox-formGroup-button']} onClick={onDelete.bind(this, name, item.id)}>
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
            <Tag key={index} className={classes['choiceBox-tag']} onRemove={onRemove.bind(this, name, item)}>{item}</Tag>
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
export default CSSModules(ChoiceBox, classes);


