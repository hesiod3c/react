import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number } from '@storybook/addon-knobs';

import Pagination from './index';

const stories = storiesOf('Pagination', module);

stories.addDecorator(withKnobs);

stories.addWithInfo('without props', () => (
  <Pagination />
));

stories.addWithInfo('with props', () => (
  <Pagination
    activePage={number('activePage', 1)}
    itemsCountPerPage={number('itemsCountPerPage', 10)}
    totalItemsCount={number('totalItemsCount', 200)}
    onChange={ action('changed') }
  />
));

stories.addWithInfo('with hide disabled', () => (
  <Pagination
    hideDisabled
    activePage={number('activePage', 1)}
    itemsCountPerPage={number('itemsCountPerPage', 10)}
    totalItemsCount={number('totalItemsCount', 200)}
    onChange={ action('changed') }
  />
));

stories.addWithInfo('custom pages range', () => (
  <Pagination
    hideDisabled
    activePage={number('activePage', 1)}
    itemsCountPerPage={number('itemsCountPerPage', 10)}
    totalItemsCount={number('totalItemsCount', 200)}
    pageRangeDisplayed={number('pageRangeDisplayed', 10)}
    onChange={ action('changed') }
  />
));

