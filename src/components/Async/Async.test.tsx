import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
/* tslint:disable-next-line */
import Enzyme, { shallow } from 'enzyme';
import { List } from 'immutable';
/* tslint:disable-next-line */
import React from 'react';
import { Todo, todoDefault } from 'DUCKS/todos';
import { Async } from './Async';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const setup = (propOverrides: any) => {
  const props = {
    error: false,
    fetchTodos: () => {},
    requested: false,
    todos: sampleTodos,
    ...propOverrides,
  };
  return ({
    props,
    wrapper: shallow(<Async {...props} />),
  });
}; 
const sampleTodo = new Todo(todoDefault);
const sampleTodos = List([sampleTodo]);
describe('Async component', () => {
  it('shallow renders without crashing', () => {
    setup({});
  });
  it('shallow renders with requested', () => {
    setup({ requested: true });
  });
  it('shallow renders with error', () => {
    setup({ error: true });
  });
  it('calls fetchTodos on mount', () => {
    const fetchTodos = jest.fn();
    setup({ fetchTodos });
    expect(fetchTodos.mock.calls.length).toBe(1);
  });
});
