import ParentChoice from 'DUCKS/parentChoices/ParentChoice';
import React from 'react';
import ChildChoices from './ChildChoices';

interface ParentChoicesProps {
  choices: ParentChoice[];
}
const ParentChoices = ({ choices }: ParentChoicesProps) => {
  return (
    <div>
      {choices.map(o => (
        <div key={o.id}>
          <div>{o.name}</div>
          <ChildChoices parentId={o.id} />
        </div>
      ))}
    </div>
  );
};
export default ParentChoices;
