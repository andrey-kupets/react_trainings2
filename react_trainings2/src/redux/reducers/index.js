import { combineReducers } from "redux";
import counterReducer from './counter-reducer';
import userReducer from './users-reducer';
import productsReducer from './products-reducer';
import cartReducer from './cart-reducer';
import wishlistReducer from './wishlist-reducer';

export const reducer = combineReducers({
  counterReducer, // counter: counterReducer
  userReducer, // users: userReducer
  productsReducer, // products: productsReducer
  cart: cartReducer,
  wishlist: wishlistReducer,
})

