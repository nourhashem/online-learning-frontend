import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import appReducer from 'store/reducers/app';
import classroomReducer from 'store/reducers/classroom';
import { loadState } from './utils';

const rootReducer = combineReducers({
  app: appReducer,
  classroom: classroomReducer,
});

const preloadedState = loadState();
const devtoolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedEnhancer = devtoolsCompose(applyMiddleware(thunk));

const store = createStore(rootReducer, preloadedState, composedEnhancer);

export default store;
