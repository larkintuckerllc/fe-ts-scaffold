import { DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';
import { CARD } from '../../ItemTypes';
import Card from './Card';

interface CardContainerProps {
  text: string;
}

const cardSource = {
  beginDrag(props: CardContainerProps) {
    return {
      text: props.text,
    };
  },
  endDrag(props: CardContainerProps, monitor: DragSourceMonitor) {
    if (!monitor.didDrop()) {
      return;
    }
    window.console.log(props);
    const item = monitor.getItem();
    window.console.log(item);
    const dropResult = monitor.getDropResult();
    window.console.log(dropResult);
  },
};

const collect = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default DragSource(CARD, cardSource, collect)(Card);
