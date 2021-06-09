import { combineReducers } from "redux";
import counterReducer from './counter-reducer';
import userReducer from './users-reducer';

export const reducer = combineReducers({
  counterReducer,
  userReducer
})

