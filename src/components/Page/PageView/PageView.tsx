import { List } from 'immutable';
import React from 'react';
import AnotherCounter from './AnotherCounter';
import Ant from './Ant';
import Async from './Async';
import Choices from './Choices';
import Counter from './Counter';
import Frame from './Frame';
import InfiniteScroll from './InfiniteScroll';
import Letters from './Letters';
import Listing from './Listing';
import Media from './Media';
import Paginated from './Paginated';
import ParentChoicesSection from './ParentChoicesSection';
import PassThrough from './PassThrough';
import Risky from './Risky';
import Stateful from './Stateful';
import Styling from './Styling';
import Wrapped from './Wrapped';

interface PageViewProps {
  adder: List<string>;
  counter: number;
  infinite: boolean;
  add(value: string): void;
  decrement(): void;
  increment(): void;
  toggleInfinite(): void;
}

const PageView = ({
  add,
  adder,
  counter,
  decrement,
  increment,
  infinite,
  toggleInfinite,
}: PageViewProps) => {
  if (infinite) {
    return <InfiniteScroll />;
  }
  return (
    <Frame>
      <Ant />
      <AnotherCounter />
      <Async />
      <Choices />
      <Counter counter={counter} decrement={decrement} increment={increment} />
      <button onClick={toggleInfinite}>Show Infinite</button>
      <Letters />
      <Listing add={add} items={adder.toJS()} />
      <Media />
      <Paginated />
      <ParentChoicesSection />
      <PassThrough />
      <Risky />
      <Stateful />
      <Styling />
      <Wrapped text="test" />
    </Frame>
  );
};
export default PageView;
