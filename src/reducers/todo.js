const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      // Return a new todo with these values. It then gets added to the array used in 'ADD_TODO' in the todos reducer.
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

export default todo;