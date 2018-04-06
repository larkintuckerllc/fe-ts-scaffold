import { List } from 'immutable';
import React from 'react';
import AnotherCounter from './AnotherCounter';
import Ant from './Ant';
// import Async from './Async';
import Counter from './Counter';
import Frame from './Frame';
import Listing from './Listing';
import Media from './Media';
import Stateful from './Stateful';
import Styling from './Styling';
// import Wrapped from './Wrapped';

interface PageViewProps {
  adder: List<string>;
  counter: number;
  add(value: string): void;
  decrement(): void;
  increment(): void;
}

export default ({
  add,
  adder,
  counter,
  decrement,
  increment,
}: PageViewProps) => {
  return (
     <Frame>
       <Ant />
       <AnotherCounter />
       <Counter
         counter={counter}
         decrement={decrement}
         increment={increment}
       />
       <Listing
         add={add}
         items={adder.toJS()}
       />
       <Media />
       <Stateful />
       <Styling />
     </Frame>
  );
};
