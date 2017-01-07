import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import todos from './reducers/index';

const configureStore = () => {
  // Defines the middlewares to be used
  const middlewares = [ thunk ];
  // If production, push logger into middlewares
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }
  // Return a created store using todos from reducers/index and the defined middlewares
  return createStore(
    todos,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;