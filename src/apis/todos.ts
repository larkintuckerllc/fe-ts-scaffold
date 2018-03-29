const ENDPOINT = 'https://jsonplaceholder.typicode.com/todos';
export const fetchTodos = () => {
  return fetch(ENDPOINT)
  .then(response => response.json());
};
