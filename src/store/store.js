/* eslint-disable no-unused-vars */

import {
  createStore,
  compose,
  Store,
  StoreEnhancer,
} from 'redux';

import rootReducer from './reducers';

/** @type {(enhancer:StoreEnhancer) => StoreEnhancer} */
const composeEnhancers = (
  process.env.NODE_ENV !== 'production'
  && typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
)
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

/**
 * @param {{}} preloadedState
 * @returns {Store}
 */
const configureStore = (preloadedState) => createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(),
);

const store = configureStore({});

export default store;
