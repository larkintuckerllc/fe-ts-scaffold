import { List } from 'immutable';
import React from 'react';
import AnotherCounter from './AnotherCounter';
import Ant from './Ant';
import Async from './Async';
import Choices from './Choices';
import Counter from './Counter';
import Dnd from './Dnd';
import Form from './Form';
import Frame from './Frame';
import Letters from './Letters';
import Listing from './Listing';
import Media from './Media';
import Paginated from './Paginated';
import ParentChoices from './ParentChoices';
import PassThrough from './PassThrough';
import ReactInfiniteScroll from './ReactInfiniteScroll';
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
    window.scroll(0, 0);
    return <ReactInfiniteScroll />;
  }
  return (
    <Frame>
      <Ant />
      <AnotherCounter />
      <Async />
      <Choices />
      <Counter counter={counter} decrement={decrement} increment={increment} />
      <Dnd />
      <Form />
      <Letters />
      <Listing add={add} items={adder.toJS()} />
      <Media />
      <Paginated />
      <ParentChoices />
      <PassThrough />
      <button onClick={toggleInfinite}>Show React Infinite</button>
      <Risky />
      <Stateful />
      <Styling />
      <Wrapped text="test" />
    </Frame>
  );
};
export default PageView;
