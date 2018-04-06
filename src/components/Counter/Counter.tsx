/* tslint:disable-next-line */
import React from 'react';

interface CounterProps {
  counter: number;
  decrement(): void;
  increment(): void;
}
export default ({
  counter,
  decrement,
  increment,
}: CounterProps) => {
  return (
      <div>
        <h2>Counter</h2>
        <div>{counter.toString()}</div>
        <button id="test_increment" onClick={increment}>+</button>
        <button id="test_decrement" onClick={decrement}>-</button>
      </div>
  );
};
