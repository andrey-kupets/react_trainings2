import {applyMiddleware, createStore} from "redux";
import {reducer} from "./reducers";
import {
  CUSTOM,
  DEC,
  INC,
  RESET
} from "./action-types";

const logger = (store) => (next) => (action) =>{
  console.log('action', action)
  let result = next(action);
  console.log('next state', store.getState())
  return result;
};

const protectCounter = (store) => (next) => (action) =>{
  const counterActions = [
    CUSTOM,
    DEC,
    INC,
    RESET
  ];

  const { isAllowedToChange } = store.getState().counterReducer // this field is for simplest way to allow some actions via state

  if (!isAllowedToChange && counterActions.includes(action.type)) {
    console.log(`u're not allowed to modify counter`);
    return;
  }

  next(action);
};

const persister = (store) => (next) => (action) => {
  next(action);
  const { counterReducer } = store.getState();

  localStorage.setItem('COUNTER_OBJECT', JSON.stringify(counterReducer));
}

const middlewares = [protectCounter, /*logger, */ persister];

export const store = createStore(
  reducer,
  applyMiddleware(...middlewares),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for dev tools
);
