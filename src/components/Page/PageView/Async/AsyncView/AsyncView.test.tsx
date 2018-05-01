import { TodoFactory, TodoRecord } from 'DUCKS/todos/Todo';
import Enzyme, { shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import { List } from 'immutable';
import React from 'react';
import AsyncView from './AsyncView';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });

const todoDefault = {
  completed: false,
  id: 0,
  title: 'title',
  userID: 0,
};
const sampleTodo = TodoFactory(todoDefault);
const sampleTodos = List([sampleTodo]);
const getDefaultProps = () => ({
  error: false,
  fetchTodos: jest.fn(),
  requested: false,
  todos: sampleTodos,
});

describe('Async component', () => {
  it('shallow renders without crashing', () => {
    const defaultProps = getDefaultProps();
    shallow(<AsyncView {...defaultProps} />);
  });
  it('renders differently with requested', () => {
    const { requested, ...defaultProps } = getDefaultProps();
    const wrapper = shallow(<AsyncView {...defaultProps} requested={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders differently with not requested and error', () => {
    const { error, ...defaultProps } = getDefaultProps();
    const wrapper = shallow(<AsyncView {...defaultProps} error={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders differently with not requested not error and 0 todos', () => {
    const { todos, ...defaultProps } = getDefaultProps();
    const emptyTodos = List<TodoRecord>([]);
    const wrapper = shallow(<AsyncView {...defaultProps} todos={emptyTodos} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls fetchTodos on mount', () => {
    const { fetchTodos, ...defaultProps } = getDefaultProps();
    const callsLength = 1;
    shallow(<AsyncView {...defaultProps} fetchTodos={fetchTodos} />);
    expect(fetchTodos.mock.calls.length).toBe(callsLength);
  });
});
