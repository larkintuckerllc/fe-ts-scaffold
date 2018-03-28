/* tslint:disable-next-line */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'STORE/configureStore';
import Page from './Page';

const store = configureStore();
/* tslint:disable-next-line */
export default function App() {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
}
