/* tslint:disable-next-line */
import React from 'react';
import toJS from './toJS';

interface ListProps {
  items: any;
}
function AppList ({
  items,
}: ListProps) {
  return (
     <ul>
       {items.map((o:any) => <li>{o}</li>)}
     </ul>
  );
}
export default toJS(AppList);

