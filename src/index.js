import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import todoApp from './reducers'
import Root from './components/Root';
import configureStore from './store/configureStore';

import './styles.css';

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root')
)
