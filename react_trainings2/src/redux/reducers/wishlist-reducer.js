import {
  ADD_PRODUCT_TO_WISHLIST,
  REMOVE_PRODUCT_FROM_WISHLIST,
} from '../action-types';

const initialState = {
  productsInWishlist: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_WISHLIST: return {
      ...state,
    };
    case REMOVE_PRODUCT_FROM_WISHLIST: return {
      ...state,
    };
    default:
      console.log(`action ${action.type} doesn't exist`);
      return state;
  }
}

export default reducer;
