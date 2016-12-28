const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      // Return the current array and use todo reducer to add a new todo object to the end. 'undefined' is passed because a new todo doesn't require state, and 'ADD_TODO' is passed as the action.
      return [
        ...state,
        //
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      // Take each item in todos and pass it through the todo reducer with 'TOGGLE_TODO' as the action.
      return state.map((t) => todo(t, action));
    case 'REMOVE_TODO':
      let index;
      state.map((t, i) => {
        if (t.id === action.id) {
          index = i;
        }
      });
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    default:
      return state;
  }
};

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
      // Return the original state if the IDs DON'T match.
      if (state.id !== action.id) {
        return state;
      }
      return {
        // If the IDs DO match, return the current state object, but flip completed.
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

export default todos;