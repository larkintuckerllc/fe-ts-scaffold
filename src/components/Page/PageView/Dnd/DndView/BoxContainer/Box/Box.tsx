import React, { StatelessComponent } from 'react';
import { ConnectDropTarget } from 'react-dnd';

interface BoxProps {
  hovered: boolean;
  connectDropTarget: ConnectDropTarget;
}

const Box: StatelessComponent<BoxProps> = ({ connectDropTarget, hovered }) =>
  connectDropTarget(<div style={{ color: hovered ? 'red' : 'black' }}>BOX</div>);

export default Box;
