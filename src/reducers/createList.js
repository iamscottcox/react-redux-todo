import { combineReducers } from 'redux'

const createList = (filter) => {
  const handleToggle = (state, action) => {
    // Get action.response.result as toggledId
    // Get action.response.entities as entities
    const { result: toggledId, entities } = action.response;
    // Get entities.todos[toggledId] as completed
    const { completed } = entities.todos[toggledId];
    // Return Boolean for active or completed todos
    const shouldRemove = (
      (completed && filter === 'active') ||
      (!completed && filter === 'completed')
    );
    return shouldRemove ?
      // If true, return all todos apart from the matched todos
      state.filter(id => id !== toggledId) :
      // Otherwise, just return the state
      state;
  };

  const ids = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
        // Filter is passed in a the root of the function
        return filter === action.filter ?
          // Return an array of results where filter matches action.filter
          action.response.result :
          state;
      case 'ADD_TODO_SUCCESS':
        // if filter is not completed...
        return filter !== 'completed' ?
          // ...add id to current ids...
          [...state, action.response.result] :
          state;
      case 'TOGGLE_TODO_SUCCESS':
        return handleToggle(state, action);
      default:
        return state;
    }
  };
  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      // When a request is made, isFetching returns true
      case 'FETCH_TODOS_REQUEST':
        return true;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
        // On success OR fail, isFetching reverts back to false
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_FAILURE':
        // Logs the error message
        return action.message;
      case 'FETCH_TODOS_REQUEST':
      case 'FETCH_TODOS_SUCCESS':
        // Clears the error message
        return null;
      default:
        return state;
    }
  };
  // Returns a reducer made out of all of the reducers in this function to be exported later
  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};


export default createList;

// These are selector functions that return a value from state
export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;