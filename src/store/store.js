/* eslint-disable no-unused-vars */

import {
  createStore,
  compose,
  Store,
  StoreEnhancer,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { loggerMdw } from './middlewares';

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
  composeEnhancers(applyMiddleware(thunk, loggerMdw)),
);

const store = configureStore({});

export default store;
