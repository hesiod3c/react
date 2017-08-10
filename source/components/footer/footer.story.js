import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Footer from './index';

const stories = storiesOf('Footer', module);

stories.addDecorator(withKnobs);

stories.addWithInfo('Normal', () => (
  <Footer />
));
