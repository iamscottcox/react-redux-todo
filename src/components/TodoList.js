import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Todo from './Todo'

const TodoList = ({
  todos, onTodoClick
}) => {
  return (
    <ReactCSSTransitionGroup
      id="TodoList"
      component="ul"
      transitionName="todo"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      {todos.map(todo =>
        <Todo
          id={todo.id}
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
        />
      )}
    </ReactCSSTransitionGroup>
  )
};

export default TodoList