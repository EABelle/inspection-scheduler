import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(
  reducers,
  applyMiddleware(logger, thunk),
);

export default store;
