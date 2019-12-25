import { combineReducers } from 'redux';
import inspectors from './inspectors';
import inspections from './inspections';
import calendar from './calendar';

const reducers = combineReducers({
  inspectors,
  calendar,
  inspections,
});

export default reducers;
