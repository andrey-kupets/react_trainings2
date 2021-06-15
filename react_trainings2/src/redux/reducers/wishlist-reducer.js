import {
  ADD_PRODUCT_TO_WISHLIST,
  REMOVE_PRODUCT_FROM_WISHLIST,
} from '../action-types';


const initFromLS = localStorage.getItem('WISHLIST');

const initialState = initFromLS ? JSON.parse(initFromLS) : {
  productsInWishlist: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_WISHLIST: return {
      ...state,
      productsInWishlist: [...state.productsInWishlist, action.payload]
    };
    case REMOVE_PRODUCT_FROM_WISHLIST: return {
      ...state,
      // productsInWishlist: [...state.productsInWishlist.filter(el => el !== action.payload)]
      productsInWishlist: state.productsInWishlist.filter(el => el !== action.payload)
    };
    default:
      console.log(`action ${action.type} doesn't exist`);
      return state;
  }
}

export default reducer;
