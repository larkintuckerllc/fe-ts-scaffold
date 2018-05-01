import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import WrappedView from './WrappedView';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const getDefaultProps = () => ({
  clickCount: 0,
  text: 'hello world',
});

describe('WrappedView component', () => {
  it('shallow renders without crashing', () => {
    const defaultProps = getDefaultProps();
    shallow(<WrappedView {...defaultProps} />);
  });

  it('shallow renders with clickCount >= 5 without crashing', () => {
    const { clickCount, ...defaultProps } = getDefaultProps();
    const testClickCount = 5;
    shallow(<WrappedView {...defaultProps} clickCount={testClickCount} />);
  });
});
