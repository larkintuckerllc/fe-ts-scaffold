import { Record } from 'immutable';

const itemDefault = {
  id: 0,
  name: 'name',
};

export interface ItemJS {
  id: number;
  name: string;
}

export default class Item extends Record(itemDefault) {
  constructor(params: ItemJS) {
    super(params);
  }
  public get<T extends keyof ItemJS>(value: T): ItemJS[T] {
    return super.get(value, null);
  }
}
