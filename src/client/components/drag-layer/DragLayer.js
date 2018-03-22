import {h, Component} from 'preact';
import {DragLayer} from 'react-dnd'
import Card from '../card/Card';
import './drag-layer.scss';

function getItemStyles({isDragging, isOverTarget, initialOffset, currentOffset}) {
  if (isOverTarget || !initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  const {x, y} = currentOffset;
  const transform = `translate(${x}px, ${y + 20}px) rotateZ(5deg)`;

  return {
    transform,
    transition: 'none',
  };
}

class CardDragLayer extends Component {
  renderItem(itemType, item) {
    return (
      <Card {...item} isDragging/>
    );
  }

  render({item, itemType, isDragging, isOverTarget, initialOffset, currentOffset}) {
    if (!isDragging) {
      return null;
    }

    return (
      <div class='drag-layer'>
        <div style={getItemStyles({isDragging, isOverTarget, initialOffset, currentOffset})}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    isOverTarget: false,
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
  };
}

export default DragLayer(collect)(CardDragLayer);
