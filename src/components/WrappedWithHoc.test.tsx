import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
/* tslint:disable-next-line */
import Enzyme, { shallow } from 'enzyme';
/* tslint:disable-next-line */
import React from 'react';
import { Wrapped } from './WrappedWithHoc';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const setup = (propOverrides: any) => {
  const props = {
    clickCount: 0,
    text: 'hello world',
    ...propOverrides,
  };
  return ({
    props,
    wrapper: shallow(<Wrapped  {...props} />),
  });
};
describe('Wrapped component', () => {
  it('shallow renders without crashing', () => {
    setup({});
  });
  it('shallow renders with clickCount >= 5 without crashing', () => {
    setup({ clickCount: 5 });
  });
});
