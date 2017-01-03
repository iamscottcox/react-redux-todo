import { normalize } from 'normalizr';
import * as schema from './schema';
import { getIsFetching } from '../reducers';
import * as api from '../api';

export const fetchTodos = (filter) => (dispatch, getState) => {
    // checks to see if current filter's todos are being fetched.
    if (getIsFetching(getState(), filter)) {
        // if fetching, break early and resolve the Promise
        return Promise.resolve();
    }
    // otherwise, dispatch FETCH_TODOS_REQUEST with current filter
    dispatch({
        type: 'FETCH_TODOS_REQUEST',
        filter,
    });
    // and return filtered todos, then...
    return api.fetchTodos(filter).then(
        // ...if successful...
        response => {
            // ...dispatch FETCH_TODOS_SUCCESS
            dispatch({
                type: 'FETCH_TODOS_SUCCESS',
                filter,
                response: normalize(response, schema.arrayOfTodos)
            });
        },
        // ...if unsuccessful...
        error => {
            // ...dispatch FETCH_TODOS_FAILURE
            dispatch({
                type: 'FETCH_TODOS_FAILURE',
                filter,
                message: error.message || 'Something went wrong.',
            })
        }
    );
};

export const addTodo = (text) => (dispatch) => {
    // Make api request to addTodo
    api.addTodo(text).then((response) => {
        // If successful, dispatch ADD_TODO_SUCCESS
        dispatch({
            type: 'ADD_TODO_SUCCESS',
            // Uses a normalized version of the response with the todo schema for API parity
            response: normalize(response, schema.todo)
        })
    })
};

export const toggleTodo = (id) => (dispatch) =>
    // Make API request to toggleTodo
    api.toggleTodo(id).then((response) => {
        // If successful, dispatch TOGGLE_TODO_SUCCESS
        dispatch({
            type: 'TOGGLE_TODO_SUCCESS',
            // Uses a normalized version of the response with the todo schema for API parity
            response: normalize(response, schema.todo)
        })
    });

// export const removeTodo = (id) => ({
//     type: 'REMOVE_TODO',
//     id,
// });