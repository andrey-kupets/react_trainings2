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
    };
    case REMOVE_PRODUCT_FROM_CART: return {
      ...state,
    };
    default:
      console.log(`action ${action.type} doesn't exist`);
      return state;
  }
}

export default reducer;
