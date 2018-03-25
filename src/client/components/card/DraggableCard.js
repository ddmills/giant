import {h, Component} from 'preact';
import {DragSource} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';
import Card from './Card';

function getStyles(isDragging) {
  return {
    opacity: isDragging ? 0 : 1,
    width: '100%',
    height: '100%',
  };
}

const cardSource = {
  beginDrag(props) {
    return props;
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      props.onDrop(dropResult);
    }
  },
};

function collect(connect, monitor) {
  return {
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  };
}

class DraggableCard extends Component {
  componentDidMount() {
    this.props.connectDragPreview(
      getEmptyImage(),
      {
        captureDraggingState: true,
      }
    );
  }

  render({connectDragSource, isDragging, onDrop, ...card}) {
    return connectDragSource(
      <div style={getStyles(isDragging)}>
        <Card {...card}/>
      </div>
    );
  }
}

export default DragSource('CARD', cardSource, collect)(DraggableCard);
