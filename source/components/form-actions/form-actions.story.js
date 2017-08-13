import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import FormActions from './index';
import Button from '../button';

import '../../../node_modules/@descco/ui-core/lib/css/06-components/form-actions.css';

const stories = storiesOf('FormActions', module);

stories.addDecorator(withKnobs);

stories.addWithInfo('Normal', () => (
  <FormActions>
    <Button style="primary" type="submit">Enviar</Button>
  </FormActions>
));
