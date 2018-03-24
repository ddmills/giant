import {h, Component} from 'preact';
import {DragLayer} from 'react-dnd'
import {CSSTransition} from 'react-transition-group';
import Card from '../card/Card';
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
          <CSSTransition in={isDragging} classNames="card-container--floating" timeout={5}>
            <div class="card-container card-container--floating">
              {this.renderItem(itemType, item)}
            </div>
          </CSSTransition>
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
