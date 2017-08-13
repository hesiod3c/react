import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import { createLogger } from 'redux-logger';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { selectWithTags } from '../../reducers';

import SelectWithTags from './index';

import '../../../node_modules/@descco/ui-core/lib/css/06-components/select-with-tags.css';

const stories = storiesOf('Select With Tags', module);

stories.addDecorator(withKnobs);

const initialState = Immutable.Map(window.__INITIAL_STATE__);

const reducers = combineReducers({
  selectWithTags
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
    value: '1022',
    label: 'Notebook'
  },
  {
    value: '10',
    label: 'Informática'
  }
];

const options = [
  {
    value: '',
    label: 'Selecione',
  },
  {
    value: '30',
    label: 'Moda',
  },
  {
    value: '40',
    label: 'batom'
  }
];

const onChange = (name, items) => {
  console.log(name, items, 'items');
};

stories.addWithInfo('Normal', () => (
  <div>
    <SelectWithTags
      options={options}
      tags={tags}
      reducerName="xpto"
      placeholder="Selecione o departamento"
      onChange={onChange}
    />
  </div>
));
