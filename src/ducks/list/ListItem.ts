import { Record } from 'immutable';

export default interface ListItem {
  id: number;
  name: string;
}

const listItemDefault: ListItem = {
  id: 0,
  name: 'name',
};

export const ListItemFactory = Record(listItemDefault);
export type ListItemRecord = Record<ListItem>;
