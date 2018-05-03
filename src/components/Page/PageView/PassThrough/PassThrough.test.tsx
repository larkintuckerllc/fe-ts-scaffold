import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { appStateRecordDefault } from 'STORE/AppState';
import PassThrough from './PassThrough';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

describe('AnotherCounter component', () => {
  it('shallow renders without crashing', () => {
    const store = createMockStore(appStateRecordDefault);
    const context = {
      store,
    };
    shallow(<PassThrough />, { context });
  });
});
