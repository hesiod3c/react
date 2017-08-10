import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import ChoiceBox from './index';

const stories = storiesOf('ChoiceBox', module);

stories.addDecorator(withKnobs);

stories.addWithInfo('Normal', () => (
  <ChoiceBox
    header="Opções"
    description="várias opções"
    placeholder="Cadastre ou busque a opção"
    onClick={action('onCadastre')}
    options={[{name:'label 1', slug:'label-1', checked: true}, {name:'label 2', slug:'label-2',}]}
    tags={['label-1']}
    onToggle={action('onToggle')}
    onRemove={action('onRemove')}
    onDelete={action('onDelete')}
    onInputChange={action('onInputChange')}
    allowCreate={true}
    allowDelete={true}
  />
));
