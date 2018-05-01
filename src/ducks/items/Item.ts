import { Record } from 'immutable';

export default interface Item {
  id: number;
  name: string;
}

const itemDefault: Item = {
  id: 0,
  name: 'name',
};

export const ItemFactory = Record<Item>(itemDefault);
