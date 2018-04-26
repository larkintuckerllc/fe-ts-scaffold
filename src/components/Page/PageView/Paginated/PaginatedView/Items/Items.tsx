import { ItemJS } from 'DUCKS/items/Item';
import React from 'react';

interface ItemsProps {
  items: ItemJS[];
}
const Items = ({ items }: ItemsProps) => {
  return <ul>{items.map(o => <li key={o.id}>{o.name}</li>)}</ul>;
};
export default Items;
