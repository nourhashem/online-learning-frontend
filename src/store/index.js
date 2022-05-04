import { createStore, combineReducers } from 'redux';
import appReducer from 'store/reducers/app';
import classroomReducer from 'store/reducers/classroom';

const rootReducer = combineReducers({
  app: appReducer,
  classroom: classroomReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
