/* tslint:disable-next-line */
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import 'babel-polyfill';
import './styles.less';
import { fetchTodos } from 'APIS/todos';

render(
  <App />,
  document.getElementById('root'),
);
fetchTodos().then(json => console.log(json));
