import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { appStateRecordDefault } from 'STORE/AppState';
import Letter from './Letter';
import LetterView from './LetterView';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const getDefaultProps = () => ({
  letter: {
    id: 0,
    name: 'A',
  },
});

describe('Letter component', () => {
  it('shallow renders without crashing', () => {
    const defaultProps = getDefaultProps();
    const store = createMockStore(appStateRecordDefault);
    const context = {
      store,
    };
    shallow(<Letter {...defaultProps} />, { context });
  });

  it('provides letterColoredToggle that dispatchs LETTER_COLORED_TOGGLE action', () => {
    const resultAction = {
      payload: 0,
      type: 'LETTER_COLORED_TOGGLE',
    };
    const defaultProps = getDefaultProps();
    const store = createMockStore(appStateRecordDefault);
    const context = {
      store,
    };
    const wrapper = shallow(<Letter {...defaultProps} />, { context });
    const testLetterView = wrapper.find(LetterView);
    testLetterView.props().letterColoredToggle();
    expect(store.getAction('LETTER_COLORED_TOGGLE')).toEqual(resultAction);
  });
});
