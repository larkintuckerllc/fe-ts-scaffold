import todosTestData from 'APIS/todos/todos.testdata';
import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import Todos from './Todos';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

describe('Todos component', () => {
  it('shallow renders without crashing', () => {
    shallow(<Todos todos={todosTestData} />);
  });
});
