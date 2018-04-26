import { List, Map, Record } from 'immutable';
import Item from './Item';

const itemsStateDefault = {
  byId: Map<number, Item>(),
  currentPage: 0,
  errored: false,
  ids: List<number>([]),
  pages: Map<number, List<number>>(),
  requested: false,
};

interface ItemsStateJS {
  byId: Map<number, Item>;
  currentPage: number;
  errored: boolean;
  ids: List<number>;
  pages: Map<number, List<number>>;
  requested: boolean;
}

export default class ItemsState extends Record(itemsStateDefault) {
  constructor(params: ItemsStateJS) {
    super(params);
  }
  public get<T extends keyof ItemsStateJS>(value: T): ItemsStateJS[T] {
    return super.get(value, null);
  }
}

export const itemsInitialState = new ItemsState(itemsStateDefault);
