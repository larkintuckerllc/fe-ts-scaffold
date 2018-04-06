import { InjectedProps } from 'COMPONENTS/hoc';
import React from 'react';

export interface WrappedProps {
  text: string;
}
export default (props: WrappedProps & InjectedProps) => {
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
