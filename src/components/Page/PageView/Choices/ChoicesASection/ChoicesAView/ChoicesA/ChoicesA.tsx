import Choice from 'DUCKS/choices/Choice';
import React from 'react';

interface ChoicesAProps {
  choices: Choice[];
}
const ChoicesA = ({ choices }: ChoicesAProps) => {
  return <ul>{choices.map(o => <li key={o.id}>{o.name}</li>)}</ul>;
};
export default ChoicesA;
