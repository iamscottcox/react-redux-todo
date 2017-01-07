const byId = (state = {}, action) => {
  // If successful...
  if (action.response) {
    // ...return the state with the todos spread onto the end
    return {
      ...state,
      ...action.response.entities.todos,
    };
  }
  // Else return the state
  return state;
};

export default byId;

// Selector for getting todos from their state by ID
export const getTodo = (state, id) => state[id];