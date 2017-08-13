import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import HelpText from './index';

import '../../../node_modules/@descco/ui-core/lib/css/06-components/help-text.css';

const stories = storiesOf('HelpText', module);

stories.addDecorator(withKnobs);

stories.addWithInfo('Normal', () => (
  <div>
    <HelpText>Example</HelpText>
  </div>
));
