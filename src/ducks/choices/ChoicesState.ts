import { List, Record } from 'immutable';
import { ChoiceRecord } from './Choice';

export default interface ChoicesState {
  errored: boolean;
  items: List<ChoiceRecord>;
  requested: boolean;
}

const choicesStateDefault: ChoicesState = {
  errored: false,
  items: List<ChoiceRecord>(),
  requested: false,
};

const ChoicesStateFactory = Record<ChoicesState>(choicesStateDefault);
export const choicesStateRecordDefault = ChoicesStateFactory(choicesStateDefault);
export type ChoicesStateRecord = Record<ChoicesState>;
