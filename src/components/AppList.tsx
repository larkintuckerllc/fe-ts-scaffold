/* tslint:disable-next-line */
import React from 'react';

interface ListProps {
  items: string[];
}
export default function ({
  items,
}: ListProps) {
  return (
     <ul>
       {items.map(o => <li>{o}</li>)}
     </ul>
  );
}
