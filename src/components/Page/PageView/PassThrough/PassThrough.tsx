import React from 'react';
import AnotherCounter from './AnotherCounter';

const PassThrough = () => (
  <div>
    <h2>PassThrough</h2>
    <AnotherCounter passed="dog" />
  </div>
);
export default PassThrough;
