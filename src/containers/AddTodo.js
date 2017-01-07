import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <form id="AddTodo"
          className="add-todo"
          onSubmit={(e) => {
            e.preventDefault();
            if (input.value.length > 0) {
              dispatch(addTodo(input.value));
              input.value = '';
            }
          }}>
      <input type="text"
             ref={node => {
               input = node
             }}
             placeholder="Add a todo..."/>
      <button type="submit">
        <i className="fa fa-plus"></i>
      </button>
    </form>
  )
}
// Connect() without any parameters creates a container that doesn't subscribe to the store, but
// will pass dispatch to the component that it wraps.
AddTodo = connect()(AddTodo);

export default AddTodo