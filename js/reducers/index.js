import thunkMiddleware from 'redux-thunk'
import { combineReducers, applyMiddleware, createStore } from 'redux';

import editions from './editions.js';
import events from './events.js';

const reducers = combineReducers({
  editions,
  events,
});

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
);

export default store;
