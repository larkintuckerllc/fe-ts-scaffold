import React from 'react';

interface LetterViewProps {
  colored: boolean;
  letter: { id: number; name: string };
  letterColoredToggle(): void;
}
const LetterView = ({ colored, letter, letterColoredToggle }: LetterViewProps) => {
  return (
    <li style={{ color: colored ? 'green' : 'black' }} onClick={letterColoredToggle}>
      {letter.name}
    </li>
  );
};
export default LetterView;
