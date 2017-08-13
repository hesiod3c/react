import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';

import Suggestions from './index';

import '../../../node_modules/@descco/ui-core/lib/css/06-components/suggestions.css';

const stories = storiesOf('Suggestions', module);

stories.addDecorator(withKnobs);

const suggestions = [
  {id: 1, name: 'test_1'},
  {id: 2, name: 'example_2'},
  {id: 3, name: 'example_3'},
  {id: 4, name: 'test_4'},
  {id: 5, name: 'example_5'},
  {id: 6, name: 'example_6'},
  {id: 7, name: 'teste_7'},
  {id: 8, name: 'example_8'},
  {id: 9, name: 'example_9'},
  {id: 10, name: 'example_10'}
];


stories.addWithInfo('Normal', () => (
  <Suggestions
    listboxId={'reactTags-listbox'}
    expandable={true}
    suggestions={suggestions}
    query={text('Query', 'example')}
    addTag={action('add')}
    maxSuggestionsLength={6} />
));

