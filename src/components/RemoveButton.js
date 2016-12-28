import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index'

let RemoveButton = ({value, dispatch}) => {
  return (
    <i className="fa fa-times"
       onClick={() => {
         dispatch(actions.removeTodo(value));
       }}>
    </i>
  )
};

RemoveButton = connect()(RemoveButton);

export default RemoveButton;