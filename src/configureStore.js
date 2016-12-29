import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import todoApp from './reducers/index';

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore errors.
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const addLoggingToDispatch = (store) => {
  // Takes dispatch from the store
  const rawDispatch = store.dispatch;
  // if browser doesn't have console.group()...
  if (!console.group) {
    // just return dispatch from the store
    return rawDispatch;
  }
  // otherwise return...
  return ( action ) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
};

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(todoApp, persistedState);

  if (process.env.NODE_ENV !== 'production') {
    // Modifies store.dispatch to include logging
    store.dispatch = addLoggingToDispatch(store);
  }

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos
    });
  }, 1000));

  return store;
};

export default configureStore;