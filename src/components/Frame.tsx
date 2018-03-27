/* tslint:disable-next-line */
import React from 'react';

interface FrameProps {
  children: JSX.Element[],
}
/* tslint:disable-next-line */
export default function Frame ({
  children,
}: FrameProps) {
  return (
      <div style={{ border: 'solid' }}>
        {children}
      </div>
  );
}