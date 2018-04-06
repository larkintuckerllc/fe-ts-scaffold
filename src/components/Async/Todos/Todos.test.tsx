import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
/* tslint:disable-next-line */
import Enzyme, { shallow } from 'enzyme';
/* tslint:disable-next-line */
import React from 'react';
import { todoDefault } from 'DUCKS/todos';
import Todos from './Todos';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const getDefaultProps = () => ({
  todos: [todoDefault],
});
describe('Todos component', () => {
  it('shallow renders without crashing', () => {
    const { todos } = getDefaultProps();
    shallow((
      <Todos
        todos={todos}
      />
    ));
  });
});
