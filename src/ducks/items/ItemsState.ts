import { List, Map, Record } from 'immutable';
import { ItemRecord } from './Item';

export default interface ItemsState {
  byId: Map<number, ItemRecord>;
  currentPage: number;
  errored: boolean;
  ids: List<number>;
  lastPage: number;
  pages: Map<number, List<number>>;
  requested: boolean;
}

const itemsStateDefault: ItemsState = {
  byId: Map<number, ItemRecord>(),
  currentPage: 0,
  errored: false,
  ids: List<number>([]),
  lastPage: 0,
  pages: Map<number, List<number>>(),
  requested: false,
};

export const itemsInitialState = Record<ItemsState>(itemsStateDefault)(itemsStateDefault);
export type ItemsStateRecord = Record<ItemsState>;
