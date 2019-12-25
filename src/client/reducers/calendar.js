import { FETCH_CALENDAR, SET_DEFAULT_CALENDAR } from '../actions';

const calendar = (state = [], action) => {
  switch (action.type) {
    case FETCH_CALENDAR:
      return action.payload;
    case SET_DEFAULT_CALENDAR:
      return [];
    default:
      return state;
  }
};

export default calendar;
