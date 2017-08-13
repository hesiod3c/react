import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import { createLogger } from 'redux-logger';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { autosuggestWithTags } from '../../reducers';

import AutosuggestWithTags from './index';

import '../../../node_modules/@descco/ui-core/lib/css/06-components/autosuggest-with-tags.css';

const stories = storiesOf('Auto Suggest With Tags', module);

stories.addDecorator(withKnobs);

const initialState = Immutable.Map(window.__INITIAL_STATE__);

const reducers = combineReducers({
  autosuggestWithTags
});

const rootReducer = combineReducers({
  reducers
});

const store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware, createLogger({ collapsed: true, stateTransformer: state => state.toJS() })));

stories.addDecorator((getStory) => (
  <Provider store={store}>
    { getStory() }
  </Provider>
));

const tags = [
  {
    id: '1022',
    name: 'Notebook',
    parent: {
      id: '10',
      name: 'Informática',
    }
  },
  {
    id: '10',
    name: 'Informática'
  }
];

const options = [
  {
    id: '30',
    name: 'Moda',
  },
  {
    id: '40',
    name: 'batom',
    parent: {
      id: '50',
      name: 'Moda',
    }
  }
];

const onChange = (name, items) => {
  console.log(name, items, 'items');
};

stories.addWithInfo('Normal', () => (
  <div>
    <AutosuggestWithTags
      options={options}
      tags={tags}
      reducerName="xpto"
      placeholder="Busque o departamento"
      onChange={onChange}
    />
  </div>
));

stories.addWithInfo('With two components', () => (
  <div>
    <AutosuggestWithTags
      options={options}
      reducerName="categories"
      placeholder="Busque o departamento 1"
    />
    <AutosuggestWithTags
      options={options}
      reducerName="users"
      placeholder="Busque o departamento 2"
    />
  </div>
));

stories.addWithInfo('Without suggestions', () => (
  <div>
    <AutosuggestWithTags
      tags={tags}
      reducerName="xpto2"
      placeholder="Adicione um departamento"
      onChange={onChange}
    />
  </div>
));
