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
        <button id="rootIncrement" onClick={increment}>+</button>
        <button id="rootDecrement" onClick={decrement}>-</button>
      </div>
  );
}
