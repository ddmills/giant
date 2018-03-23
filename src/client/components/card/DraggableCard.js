import {h, Component} from 'preact';
import {DragSource} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';
import Card from './Card';

const cardSource = {
  beginDrag(props) {
    return props;
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      props.onDrop();
    }
  },
};

function collect(connect, monitor) {
  return {
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

  render({connectDragSource, onDrop, ...card}) {
    return connectDragSource(
      <div>
        <Card {...card}/>
      </div>
    );
  }
}

export default DragSource('CARD', cardSource, collect)(DraggableCard);
