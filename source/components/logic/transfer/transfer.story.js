import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import { createLogger } from 'redux-logger';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { transfer } from '../../../reducers';

import Transfer from './index';

const stories = storiesOf('Transfer', module);

stories.addDecorator(withKnobs);

const initialState = Immutable.Map(window.__INITIAL_STATE__);

const reducers = combineReducers({
  transfer
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

const list = [{label: 'aaa', value: 'aaa'},{label: 'bbb', value: 'bbb'}];
const list2 = [{label: 'ccc', value: 'ccc'},{label: 'ddd', value: 'ddd'}];

const onChange = (name, filteredList) => {
  console.log(name, filteredList, 'item');
};


stories.addWithInfo('Normal', () => (
  <div>
    <Transfer
      items={list}
      reducerName="xpto"
      filtered={[{label: 'eee', value: 'eee'}]}
      listTitle={text('Titulo da lista', 'Lista de itens')}
      filteredListTitle={text('Titulo da lista de inclusão', 'Itens escolhidos')}
      onChange={onChange}
    />
  </div>
));

stories.addWithInfo('With two components', () => (
  <div>
    <Transfer items={list} reducerName="categories" />
    <Transfer items={list2} reducerName="users" />
  </div>
));

