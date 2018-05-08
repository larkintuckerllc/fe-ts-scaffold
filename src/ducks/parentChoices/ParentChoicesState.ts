import { List, Record } from 'immutable';
import { ParentChoiceRecord } from './ParentChoice';

export default interface ParentChoicesState {
  errored: boolean;
  items: List<ParentChoiceRecord>;
  requested: boolean;
}

const parentChoicesStateDefault: ParentChoicesState = {
  errored: false,
  items: List<ParentChoiceRecord>(),
  requested: false,
};

const ParentChoicesStateFactory = Record<ParentChoicesState>(parentChoicesStateDefault);
export const parentChoicesStateRecordDefault = ParentChoicesStateFactory(parentChoicesStateDefault);
export type ParentChoicesStateRecord = Record<ParentChoicesState>;
