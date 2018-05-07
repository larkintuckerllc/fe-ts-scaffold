import { List, Record } from 'immutable';
import { ListItemRecord } from './ListItem';

export default interface ListState {
  errored: boolean;
  items: List<ListItemRecord>;
  requested: boolean;
}

const listStateDefault: ListState = {
  errored: false,
  items: List<ListItemRecord>(),
  requested: false,
};

const ListStateFactory = Record<ListState>(listStateDefault);
export const listStateRecordDefault = ListStateFactory(listStateDefault);
export type ListStateRecord = Record<ListState>;
