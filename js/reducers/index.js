import { AsyncStorage } from 'react-native';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import { persistStore, autoRehydrate } from 'redux-persist';
import createLogger from 'redux-logger';

import editions from './editions.js';
import events from './events.js';
import organizations from './organizations.js';
import settings from './settings.js';


const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const reducers = combineReducers({
  editions,
  events,
  organizations,
  settings,
});

const middlewares = applyMiddleware(
  thunk,
  logger,
);

const enhancers = compose(
  autoRehydrate(),
  middlewares,
  devTools(),
);

const store = createStore(
  reducers,
  undefined,
  enhancers,
);

persistStore(store, { storage: AsyncStorage });

export default store;
