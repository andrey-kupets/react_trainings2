import {
  ADD_PRODUCT_TO_WISHLIST,
  REMOVE_PRODUCT_FROM_WISHLIST,
} from '../action-types';

const addProductToWishlist = (id) => ({ type: ADD_PRODUCT_TO_WISHLIST, payload: id });
const removeProductFromWishlist = (id) => ({ type: REMOVE_PRODUCT_FROM_WISHLIST, payload: id });

const toggleItemInWishlist = (id) => (dispatch, getState) => {
  const { wishlist: { productsInWishlist } } = getState();
  // const productExists = !!productsInCart.find(el => el === id);
  // const productExists = productsInWishlist.some(el => el === id);
  const productExists = productsInWishlist.includes(id);
  console.log(productExists);
  console.log(getState(), id);

  dispatch(productExists ? removeProductFromWishlist(id) : addProductToWishlist(id));
};

export {
  toggleItemInWishlist
}
