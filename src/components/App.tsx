import React from 'react';
import { Provider } from 'react-redux';
import store from 'STORE/store';
import Page from './Page';

export default () => {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
};
