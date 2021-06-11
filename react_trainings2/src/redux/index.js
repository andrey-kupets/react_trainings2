import {applyMiddleware, createStore} from "redux";
import {reducer} from "./reducers";

const logger = (store) => (next) => (action) =>{
  console.log(store.getState())

  let result = next(action);
  console.log(result);
  console.log(store.getState())
  return result;
}

const middlewares = [logger];

export const store = createStore(
  reducer,
  applyMiddleware(...middlewares),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for dev tools
);
