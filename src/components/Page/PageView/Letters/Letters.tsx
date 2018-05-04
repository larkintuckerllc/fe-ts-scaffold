import React from 'react';
import Letter from './Letter';

const letters = [
  {
    id: 0,
    name: 'A',
  },
  {
    id: 1,
    name: 'B',
  },
  {
    id: 2,
    name: 'C',
  },
];
const Letters = () => (
  <div>
    <h2>Letters</h2>
    <ul>{letters.map(letter => <Letter key={letter.id} letter={letter} />)}</ul>
  </div>
);
export default Letters;
