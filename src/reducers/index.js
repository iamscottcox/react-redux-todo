import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

// Reducer listByFilter uses createList to make more reducers for the state object
const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const todos = combineReducers({
  byId,
  listByFilter
});

export default todos;

export const getVisibleTodos = (state, filter) => {
  // Returns an array of objects by getting all IDs using getIds()...
  const ids = fromList.getIds(state.listByFilter[ filter ]);
  // ...then using those IDs with getTodos().
  return ids.map(id => {
    return fromById.getTodo(state.byId, id);
  });
};

export const getIsFetching = (state, filter) => {
  // Uses getIsFetching() to get the current filter's fetching state
  return fromList.getIsFetching(state.listByFilter[ filter ]);
};

export const getErrorMessage = (state, filter) => {
  // Uses getErrorMessage() to get the current filter's error message
  return fromList.getErrorMessage(state.listByFilter[ filter ]);
};
