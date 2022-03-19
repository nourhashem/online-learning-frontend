import { createStore, combineReducers } from 'redux';
import appReducer from 'store/reducers/app';

const rootReducer = combineReducers({
  app: appReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
