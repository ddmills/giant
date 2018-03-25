import {h, Component} from 'preact';
import {DragLayer} from 'react-dnd'
import Card from '../card/Card';
import CardContainer from '../card-container/CardContainer';
import './drag-layer.scss';

function getItemStyles({isOverTarget, initialOffset, currentOffset}) {
  if (isOverTarget || !initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  const {x, y} = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
  };
}

class CardDragLayer extends Component {
  renderItem(itemType, item) {
    if (!item) {
      return;
    }

    return (
      <Card {...item}/>
    );
  }

  render({item, itemType, isDragging, isOverTarget, initialOffset, currentOffset}) {
    return (
      <div class='drag-layer'>
        <div style={getItemStyles({isOverTarget, initialOffset, currentOffset})}>
          <CardContainer isFloating={isDragging}>
            {this.renderItem(itemType, item)}
          </CardContainer>
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
