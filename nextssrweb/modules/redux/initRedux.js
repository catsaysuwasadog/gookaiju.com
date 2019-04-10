/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import themeReducer from 'modules/redux/themeReducer';
import optionsReducer from 'modules/redux/optionsReducer';
import actionsReducer from 'modules/redux/actionsReducer';

let devtools = x => x;

if (
  process.env.NODE_ENV !== 'production' &&
  process.browser &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

function create(initialState) {
  let middleware = [];

  if (
    process.env.NODE_ENV !== 'production' &&
    process.browser &&
    !window.__REDUX_DEVTOOLS_EXTENSION__ &&
    Object.assign
  ) {
    // eslint-disable-next-line global-require
    const createLogger = require('redux-logger').createLogger;
    middleware = [...middleware, createLogger()];
  }

  return createStore(
    combineReducers({
      theme: themeReducer,
      options: optionsReducer,
      responses: actionsReducer,
    }),
    initialState,
    compose(
      applyMiddleware(...middleware),
      devtools,
    ),
  );
}

export default function initRedux(initialState) {
  if (!process.browser) {
    return create(initialState);
  }

  if (!global.__INIT_REDUX_STORE__) {
    global.__INIT_REDUX_STORE__ = create(initialState);
  }

  return global.__INIT_REDUX_STORE__;
}
