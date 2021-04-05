import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { weatherReducer} from './reducers/weatherReducer';
import { toastReducer } from './reducers/toastReducer';
import {prefReducer} from './reducers/prefReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
  weatherReducer,
  toastReducer,
  prefReducer,
  userReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))