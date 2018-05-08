import ParentChoice from 'DUCKS/parentChoices/ParentChoice';
import React from 'react';

interface ParentChoicesProps {
  choices: ParentChoice[];
}
const ChoicesA = ({ choices }: ParentChoicesProps) => {
  return <ul>{choices.map(o => <li key={o.id}>{o.name}</li>)}</ul>;
};
export default ChoicesA;
