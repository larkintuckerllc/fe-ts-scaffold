import { todoDefault } from 'DUCKS/todos/Todo';
import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
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
