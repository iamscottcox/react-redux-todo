import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import * as actions from '../actions'
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers'
import TodoList from '../components/TodoList'
import FetchError from '../components/FetchError';

class VisibleTodoList extends Component {

  fetchData() {
    const { filter, fetchTodos } = this.props;
    console.log(this.props);
    // fetchTodos is passed in with actions in connect()
    fetchTodos(filter);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    // If the filter now is different to the previous filter...
    if (this.props.filter !== prevProps.filter) {
      // ...fetch new data
      this.fetchData();
    }
  }

  render() {
    // toggleTodo => action, [todos, isFetching, errorMessage] => mapStateToProps
    const { toggleTodo, todos, isFetching, errorMessage } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      )
    }
    return (
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    )
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  }
};

// withRouter makes sure that React-Router props are passed to VisibleTodoList
VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList