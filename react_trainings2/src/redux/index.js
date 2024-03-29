import {applyMiddleware, createStore} from "redux";
import {reducer} from "./reducers";
import {
  CUSTOM,
  DEC,
  INC,
  RESET
} from "./action-types";
import thunk from "redux-thunk";

const logger = (store) => (next) => (action) => {
  // console.log('prev state', store.getState()) // 1 show that the process chain is synchronous

  // console.log('action', action)
  let result = next(action);
  // console.log('next state', store.getState()) // 2 show that the process chain is synchronous
  return result;
};

const protectCounter = (store) => (next) => (action) => {
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
  const { counterReducer, cart, wishlist } = store.getState();

  localStorage.setItem('COUNTER_OBJECT', JSON.stringify(counterReducer));
  localStorage.setItem('WISHLIST', JSON.stringify(wishlist));
  localStorage.setItem('CART', JSON.stringify(cart));
}

// const customThunk = (store) => (next) => async (action) => {
//   if (typeof action === 'function') {
//     await action(store.dispatch);
//     console.log(store.dispatch);
//     return;
//   }
//
//   return next(action);
// };
const middlewares = [thunk, protectCounter, logger,  persister];

export const store = createStore(
  reducer,
  applyMiddleware(...middlewares),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for dev tools
);
