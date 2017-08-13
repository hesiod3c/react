import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import '../../../node_modules/@descco/ui-core/lib/css/06-components/footer.css';

import Footer from './index';

const stories = storiesOf('Footer', module);

stories.addDecorator(withKnobs);

stories.addWithInfo('Normal', () => (
  <Footer />
));
