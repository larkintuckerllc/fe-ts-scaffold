import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DndView from './DndView';

export default DragDropContext(HTML5Backend)(DndView);
