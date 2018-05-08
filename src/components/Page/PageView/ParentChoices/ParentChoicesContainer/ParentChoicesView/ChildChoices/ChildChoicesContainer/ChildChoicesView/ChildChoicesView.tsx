import ChildChoice from 'DUCKS/childChoices/ChildChoice';
import React from 'react';

interface ChildChoicesViewProps {
  choices: ChildChoice[];
}
const ChildChoicesView = ({ choices }: ChildChoicesViewProps) => {
  return <ul>{choices.map(o => <li key={o.id}>{o.name}</li>)}</ul>;
};
export default ChildChoicesView;
