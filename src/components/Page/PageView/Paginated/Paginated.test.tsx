import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { appStateInitial } from 'STORE/AppState';
import Paginated from './Paginated';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const getDefaultProps = () => ({});

describe('Paginated component', () => {
  it('shallow renders without crashing', () => {
    const {} = getDefaultProps();
    const store = createMockStore(appStateInitial);
    const context = {
      store,
    };
    shallow(<Paginated />, { context });
  });
});
