import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { appStateRecordDefault } from 'STORE/AppState';
import Async from './Async';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const getDefaultProps = () => ({});

describe('Async component', () => {
  it('shallow renders without crashing', () => {
    const {} = getDefaultProps();
    const store = createMockStore(appStateRecordDefault);
    const context = {
      store,
    };
    shallow(<Async />, { context });
  });
});
