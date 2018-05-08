import { Record } from 'immutable';

export default interface ChildChoice {
  id: number;
  name: string;
}

const childChoiceDefault: ChildChoice = {
  id: 0,
  name: 'name',
};

export const ChildChoiceFactory = Record(childChoiceDefault);
export type ChildChoiceRecord = Record<ChildChoice>;
