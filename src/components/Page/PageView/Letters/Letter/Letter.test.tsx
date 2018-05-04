import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { appStateRecordDefault } from 'STORE/AppState';
import Letter from './Letter';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const getDefaultProps = () => ({
  letter: {
    id: 0,
    name: 'A',
  },
});

describe('AnotherCounter component', () => {
  it('shallow renders without crashing', () => {
    const defaultProps = getDefaultProps();
    const store = createMockStore(appStateRecordDefault);
    const context = {
      store,
    };
    shallow(<Letter {...defaultProps} />, { context });
  });
});
