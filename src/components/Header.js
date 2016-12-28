import React from 'react'
import FilterLink from '../containers/FilterLink'

const Header = () => (
  <p id="Header">
    <FilterLink
      filter='all'>
      <i className="fa fa-list"></i>
    </FilterLink>
    <FilterLink
      filter='active'>
      <i className="fa fa-circle-o"></i>
    </FilterLink>
    <FilterLink
      filter='completed'>
      <i className="fa fa-dot-circle-o"></i>
    </FilterLink>
  </p>
);

export default Header