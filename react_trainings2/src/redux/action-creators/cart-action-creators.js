import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
} from '../action-types';

const addProductToCart = (id) => ({ type: ADD_PRODUCT_TO_CART, payload: id });
const removeProductFromCart = (id) => ({ type: REMOVE_PRODUCT_FROM_CART, payload: id });

const toggleItemInCart = (id) => (dispatch, getState) => {
  const { cart: { productsInCart } } = getState();
  // const productExists = !!productsInCart.find(el => el === id);
  const productExists = productsInCart.some(el => el === id);
  // const productExists = productsInCart.includes(id);
  console.log(productExists);
  console.log(getState(), id);

  dispatch(productExists ? removeProductFromCart(id) : addProductToCart(id));
};

export {
  toggleItemInCart
}
