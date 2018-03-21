/* tslint:disable-next-line */
import React from 'react';
/* tslint:disable-next-line */
import { Button } from 'antd';
import Wow from './Wow';

interface AppProps {
  message: string;
}
export default function ({ message }: AppProps) {
  return (
    <div>
      <h1>Hello {message}</h1>
      <Button type="primary">Test</Button>
      <Wow />
    </div>
  );
}
