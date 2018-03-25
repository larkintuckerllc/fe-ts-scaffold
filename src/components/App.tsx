/* tslint:disable-next-line */
import React from 'react';

interface AppProps {
  message: string;
}
const app: React.SFC<AppProps> = ({ message }) => (
  <div>Hello {message}</div>
);
export default app;
