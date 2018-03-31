import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
/* tslint:disable-next-line */
import Enzyme, { shallow } from 'enzyme';
/* tslint:disable-next-line */
import React from 'react';
import Media from './Media';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const setup = (propOverrides: any) => {
  const props = {
    ...propOverrides,
  };
  return ({
    props,
    wrapper: shallow(<Media {...props} />),
  });
};
describe('Media component', () => {
  it('shallow renders without crashing', () => {
    setup({});
  });
});
