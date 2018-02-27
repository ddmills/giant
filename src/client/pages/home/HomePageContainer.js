import {connect} from 'preact-redux';
import HomePage from './HomePage';
import {
  INCREMENT,
  DECREMENT
} from '../../store/actions/ActionTypes';

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch({ type: INCREMENT }),
    onDecrement: () => dispatch({ type: DECREMENT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
