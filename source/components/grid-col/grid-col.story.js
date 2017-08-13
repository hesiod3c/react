import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import GridCol from './index';

import '../../../node_modules/@descco/ui-core/lib/css/06-components/grid-col.css';

const stories = storiesOf('GridCol', module);

stories.addDecorator(withKnobs);

const style = {
  'backgroundColor': '#ccc',
  'height': '100px'
};

stories.addWithInfo('Normal', () => (
  <GridCol xs={1} style={style}>Grid 1</GridCol>
));

