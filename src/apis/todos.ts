const ENDPOINT = 'https://jsonplaceholder.typicode.com/todos';
export function fetchTodos() {
  return fetch(ENDPOINT)
  .then(response => response.json());
}
