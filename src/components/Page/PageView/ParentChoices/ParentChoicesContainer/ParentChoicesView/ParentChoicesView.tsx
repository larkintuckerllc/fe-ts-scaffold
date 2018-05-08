import ParentChoice from 'DUCKS/parentChoices/ParentChoice';
import React from 'react';
import ChildChoices from './ChildChoices';

interface ParentChoicesViewProps {
  choices: ParentChoice[];
}
const ParentChoicesView = ({ choices }: ParentChoicesViewProps) => {
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
export default ParentChoicesView;
