import { todoDefault } from 'DUCKS/todos';

let error = false;
export const setError = (value: boolean): void => {
  error = value;
};
export const fetchTodos = () => error ?
  Promise.reject('500') :
  Promise.resolve([todoDefault]);
