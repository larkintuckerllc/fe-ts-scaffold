import Choice from 'DUCKS/choices/Choice';
import React from 'react';

interface ChoicesBProps {
  choices: Choice[];
}
const ChoicesB = ({ choices }: ChoicesBProps) => {
  return <ul>{choices.map(o => <li key={o.id}>{o.name}</li>)}</ul>;
};
export default ChoicesB;
