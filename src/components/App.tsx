/* tslint:disable-next-line */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'STORE/configureStore';
import Page from './Page';
import './wow';

const store = configureStore();
export default () => {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
};
