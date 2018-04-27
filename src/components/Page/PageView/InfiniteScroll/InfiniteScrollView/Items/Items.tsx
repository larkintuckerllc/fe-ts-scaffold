import { ItemJS } from 'DUCKS/items/Item';
import React from 'react';
import styles from './styles.less';

interface ItemsProps {
  items: ItemJS[];
}
const Items = ({ items }: ItemsProps) => {
  return (
    <ul>
      {items.map(o => (
        <li key={o.id} className={styles.rootItem}>
          {o.name}
        </li>
      ))}
    </ul>
  );
};
export default Items;
