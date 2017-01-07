import React from 'react'
import RemoveButton from './RemoveButton';

const Todo = ({
  onClick,
  completed,
  text,
  id
}) => (
  <li
    onClick={onClick}
    className={"todo" + (completed ? " todo-completed" : "")}>
    <i className={"fa " + (completed ? 'fa-dot-circle-o' : 'fa-circle-o')}></i>
    {text}
    <RemoveButton value={id}/>
  </li>
)

export default Todo