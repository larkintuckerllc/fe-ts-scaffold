import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { appStateRecordDefault } from 'STORE/AppState';
import Page from './Page';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const getDefaultProps = () => ({});

describe('Page component', () => {
  it('shallow renders without crashing', () => {
    const {} = getDefaultProps();
    const store = createMockStore(appStateRecordDefault);
    const context = {
      store,
    };
    shallow(<Page />, { context });
  });
});
