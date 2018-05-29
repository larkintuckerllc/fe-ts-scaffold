import { DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd';
import { CARD } from '../../ItemTypes';
import Box from './Box';

const collect = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
  connectDropTarget: connect.dropTarget(),
  hovered: monitor.isOver(),
});

export default DropTarget(CARD, {}, collect)(Box);
