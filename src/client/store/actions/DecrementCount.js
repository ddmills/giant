import {DECREMENT} from './Actions';

export default () => {
  console.log('dec', {
    type: 'DECREMENT'
  });
  return {
    type: 'DECREMENT'
  };
};
