import { ChildChoiceRecord } from 'DUCKS/childChoices/ChildChoice';
import { List } from 'immutable';
import React from 'react';
import ChildChoicesView from './ChildChoicesView';

interface ChildChoicesContainerProps {
  parentId: number;
  parentChoiceChildren: List<ChildChoiceRecord> | undefined;
}
const ChildChoicesContainer = ({ parentChoiceChildren }: ChildChoicesContainerProps) =>
  parentChoiceChildren !== undefined ? (
    <ChildChoicesView choices={parentChoiceChildren.toJS()} />
  ) : null;
export default ChildChoicesContainer;
