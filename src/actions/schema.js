import { Schema, arrayOf } from 'normalizr';

// todo follows normalizr Schema
export const todo = new Schema('todos');
// arrayOfTodos follows normalizr arrayOf Schema
export const arrayOfTodos = arrayOf(todo);