import { List, Map, Record } from 'immutable';
import Item from './Item';

const itemsStateDefault = {
  byId: Map<number, Item>(),
  errored: false,
  ids: List<number>([]),
  requested: false,
};

interface ItemsStateJS {
  byId: Map<number, Item>;
  errored: boolean;
  ids: List<number>;
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
