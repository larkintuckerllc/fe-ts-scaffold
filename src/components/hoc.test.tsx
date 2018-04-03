import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
/* tslint:disable-next-line */
import Enzyme, { shallow } from 'enzyme';
/* tslint:disable-next-line */
import React from 'react';
import { InjectedProps, hoc } from './hoc';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
interface WrappedProps {
  text: string;
}
/* tslint:disable-next-line */
const Wrapped = (props: WrappedProps & InjectedProps) => {
  const { clickCount, text } = props;
  return (
    <div>
      <div>{text}</div>
      <div>{clickCount.toString()}</div>
    </div>
  );
};
/* tslint:disable-next-line */
const WrappedWithHoc = hoc()(Wrapped);
/* tslint:disable-next-line */
const WrappedWithHocDebug = hoc({ debug: true })(Wrapped);
const getDefaultProps = () => ({
  text: 'hello world',
});
describe('hoc HOC component', () => {
  it('shallow renders without crashing', () => {
    const { text } = getDefaultProps();
    shallow(<WrappedWithHoc text={text} />);
  });
  it('handles click', () => {
    const { text } = getDefaultProps();
    const wrapper = shallow(<WrappedWithHoc text={text} />);
    wrapper.find('#test_root').simulate('click');
  });
  it('handles click with debug', () => {
    const { text } = getDefaultProps();
    const wrapper = shallow(<WrappedWithHocDebug text={text} />);
    wrapper.find('#test_root').simulate('click');
  });
});
