import { createStore, combineReducers } from 'redux';
import appReducer from 'store/reducers/app';
import classroomReducer from 'store/reducers/classroom';
import { loadState } from './utils';

const rootReducer = combineReducers({
  app: appReducer,
  classroom: classroomReducer,
});

const preloadedState = loadState();

const store = createStore(
  rootReducer,
  preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
