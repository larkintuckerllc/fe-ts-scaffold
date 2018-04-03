import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
/* tslint:disable-next-line */
import Enzyme, { shallow } from 'enzyme';
/* tslint:disable-next-line */
import React from 'react';
import { InjectedProps, hoc } from './hoc';

interface WrappedProps {
  text: string;
}
Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const setup = (optionsOverrides: any) => {
  /* tslint:disable-next-line */
  const Wrapped = (props: WrappedProps & InjectedProps) => {
    const { clickCount, text } = props;
    return (
      <div>
        <p>{text}</p>
        {clickCount >= 5 ? 'Easy there!' : 'Bring it!'}
      </div>
    );
  };
  const options = {
    ...optionsOverrides,
  };
  /* tslint:disable-next-line */
  const WrappedWithHoc = hoc(options)(Wrapped);
  return ({
    options,
    wrapper: shallow(<WrappedWithHoc text="wow" />),
  });
};
describe('Wrapped component', () => {
  it('shallow renders without crashing', () => {
    setup({});
  });
  it('XXX', () => {
    const { wrapper } = setup({});
    wrapper.find('#root').simulate('click');
  });
  it('XXX', () => {
    const { wrapper } = setup({ debug: true });
    wrapper.find('#root').simulate('click');
});
