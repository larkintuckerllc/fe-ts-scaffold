import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import LetterView from './LetterView';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const getDefaultProps = () => ({
  colored: false,
  letter: {
    id: 0,
    name: 'A',
  },
  letterColoredToggle: jest.fn(),
});

describe('Frame component', () => {
  it('shallow renders without crashing', () => {
    const defaultProps = getDefaultProps();
    shallow(<LetterView {...defaultProps} />);
  });

  it('shallow renders without crashing', () => {
    const { colored, ...defaultProps } = getDefaultProps();
    shallow(<LetterView {...defaultProps} colored={true} />);
  });
});
