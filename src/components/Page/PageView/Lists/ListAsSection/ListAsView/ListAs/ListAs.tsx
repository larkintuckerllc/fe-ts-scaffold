import ListItem from 'DUCKS/list/ListItem';
import React from 'react';

interface ListAsProps {
  list: ListItem[];
}
const ListAs = ({ list }: ListAsProps) => {
  return <ul>{list.map(o => <li key={o.id}>{o.name}</li>)}</ul>;
};
export default ListAs;
