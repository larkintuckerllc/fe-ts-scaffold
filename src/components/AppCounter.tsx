/* tslint:disable-next-line */
import React from 'react';

interface AppCounterProps {
  counter: number;
  decrement(): void;
  increment(): void;
}
/* tslint:disable-next-line */
export default function AppCounter ({
  counter,
  decrement,
  increment,
}: AppCounterProps) {
  return (
      <div>
        <div>{counter.toString()}</div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
  );
}