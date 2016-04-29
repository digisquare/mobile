import { AsyncStorage } from 'react-native';
import thunkMiddleware from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import editions from './editions.js';
import events from './events.js';
import organizations from './organizations.js';

const reducers = combineReducers({
  editions,
  events,
  organizations,
});

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware),
  autoRehydrate()
);

persistStore(store, { storage: AsyncStorage });

export default store;
