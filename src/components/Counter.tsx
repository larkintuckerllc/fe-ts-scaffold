/* tslint:disable-next-line */
import React from 'react';

interface CounterProps {
  counter: number;
  decrement(): void;
  increment(): void;
}
/* tslint:disable-next-line */
export default function Counter ({
  counter,
  decrement,
  increment,
}: CounterProps) {
  return (
      <div>
        <h2>Counter</h2>
        <div>{counter.toString()}</div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
  );
}