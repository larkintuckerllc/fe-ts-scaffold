import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import Wrapped from './Wrapped';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const getDefaultProps = () => ({
  clickCount: 0,
  text: 'hello world',
});
describe('Wrapped component', () => {
  it('shallow renders without crashing', () => {
    const { clickCount, text } = getDefaultProps();
    shallow((
      <Wrapped
        clickCount={clickCount}
        text={text}
      />
    ));
  });
  it('shallow renders with clickCount >= 5 without crashing', () => {
    const { text } = getDefaultProps();
    shallow((
      <Wrapped
        clickCount={5}
        text={text}
      />
    ));
  });
});
