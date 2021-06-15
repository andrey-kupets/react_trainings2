import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
} from '../action-types';

const initialState = {
  productsInCart: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: return {
      ...state,
      productsInCart: [...state.productsInCart, action.payload]
    };
    case REMOVE_PRODUCT_FROM_CART: return {
      ...state,
      productsInCart: [...state.productsInCart.filter(el => el !== action.payload)]
    };
    default:
      console.log(`action ${action.type} doesn't exist`);
      return state;
  }
}

export default reducer;
