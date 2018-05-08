import { Record } from 'immutable';

export default interface ParentChoice {
  id: number;
  name: string;
}

const parentChoiceDefault: ParentChoice = {
  id: 0,
  name: 'name',
};

export const ParentChoiceFactory = Record(parentChoiceDefault);
export type ParentChoiceRecord = Record<ParentChoice>;
