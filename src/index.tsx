/* tslint:disable-next-line */
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import 'babel-polyfill';
import 'whatwg-fetch';
import './styles.less';

render(
  <App />,
  document.getElementById('root'),
);
if (process.env.NODE_ENV !== 'production') {
  window.console.log('not in production');
}
