/* tslint:disable-next-line */
import React from 'react';

interface FrameProps {
  children: JSX.Element[];
}
export default ({
  children,
}: FrameProps) => {
  return (
      <div style={{ border: 'solid' }}>
        {children}
      </div>
  );
};
