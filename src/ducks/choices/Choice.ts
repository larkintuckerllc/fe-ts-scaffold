import { Record } from 'immutable';

export default interface Choice {
  id: number;
  name: string;
}

const choiceDefault: Choice = {
  id: 0,
  name: 'name',
};

export const ChoiceFactory = Record(choiceDefault);
export type ChoiceRecord = Record<Choice>;
