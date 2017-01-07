import React from 'react'
import Header from './Header'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

// params comes from React-Router
const App = ({ params }) => (
  <div id="TodoApp">
    <Header />
    <VisibleTodoList />
    <AddTodo />
  </div>
);

export default App