import React, { StatelessComponent } from 'react';
import { DragElementWrapper, DragSourceOptions } from 'react-dnd';

interface CardProps {
  isDragging: boolean;
  text: string;
  connectDragSource: DragElementWrapper<DragSourceOptions>;
}

const Card: StatelessComponent<CardProps> = ({ isDragging, text, connectDragSource }) =>
  connectDragSource(<div style={{ opacity: isDragging ? 0.5 : 1 }}>{text}</div>);

export default Card;
