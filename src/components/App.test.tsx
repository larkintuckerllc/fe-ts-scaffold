import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App';

// jest.mock('APIS/todos');
describe('App component', () => {
  it('renders without crashing', () => {
    // const todos = require('APIS/todos');
    // todos.setError(false);
    const div = document.createElement('div');
    render(<App />, div);
    unmountComponentAtNode(div);
  });
});
