/* tslint:disable-next-line */
import React from 'react';
import { hoc, InjectedProps } from './hoc';

interface WrappedProps {
  text: string;
}
/* tslint:disable-next-line */
const Wrapped = (props: WrappedProps & InjectedProps) => {
  const { clickCount, text } = props;
  return (
    <div>
      <p>{text}</p>
      <p>
        {clickCount >= 5 ? 'Easy there!' : 'Bring it!'}
      </p>
    </div>
  );
};
export default hoc()(Wrapped);
