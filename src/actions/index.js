import { normalize } from 'normalizr';
import * as schema from './schema';
import { getIsFetching } from '../reducers';
import * as api from '../api';


export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    // if fetching, break early
    return Promise.resolve();
  }
  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter,
  });

  return api.fetchTodos(filter).then(
    response => {
      console.log(
        'normalized response',
        normalize(response, schema.arrayOfTodos)
      );
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response,
      });
    },
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong.',
      })
    }
  );
};

export const addTodo = (text) => (dispatch) => {
  api.addTodo(text).then((response) => {
    console.log(
      'normalized response',
      normalize(response, schema.todo)
    );
    console.log(response);
      dispatch({
        type: 'ADD_TODO_SUCCESS',
        response,
      })
  })
};

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

export const removeTodo = (id) => ({
  type: 'REMOVE_TODO',
  id,
});