import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
/* tslint:disable-next-line */
import Enzyme, { shallow } from 'enzyme';
/* tslint:disable-next-line */
import React from 'react';
import Todos from './Todos';
import { todoDefault } from 'DUCKS/todos';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
it('shallow renders without crashing', () => {
  shallow(<Todos todos={[todoDefault]}/>);
});
