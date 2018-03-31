import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
/* tslint:disable-next-line */
import Enzyme, { shallow } from 'enzyme';
/* tslint:disable-next-line */
import React from 'react';
import Frame from './Frame';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const setup = (propOverrides: any) => {
  const props = {
    ...propOverrides,
  };
  return ({
    props,
    wrapper: shallow(
      <Frame
        {...props}
      >
       <div>one</div>
       <div>two</div>
      </Frame>,
     ),
  });
};
describe('Frame component', () => {
  it('shallow renders without crashing', () => {
    setup({});
  });
});
