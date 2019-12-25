import { FETCH_INSPECTORS, SET_DEFAULT_INSPECTORS } from '../actions';

const inspectors = (state = [], action) => {
  switch (action.type) {
    case FETCH_INSPECTORS:
      return action.payload;
    case SET_DEFAULT_INSPECTORS:
      return [];
    default:
      return state;
  }
};

export default inspectors;
