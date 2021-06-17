import {
  SET_PRODUCTS,
  START_PRODUCTS_LOADING,
  END_PRODUCTS_LOADING,
} from '../action-types';

const qsHelper = (params) => {
  const keys = Object.keys(params);

  let result = '';

  // if (!keys?.length) return result // ?? not strong required

  keys.forEach((el, i) => {
    result += `${el}=${params[el]}`

    if (i !== keys.length - 1) result += '&';
  })
  return result;
}

const startProductsLoading = () => ({type: START_PRODUCTS_LOADING});
const endProductsLoading = () => ({type: END_PRODUCTS_LOADING});
const setProducts = (payload) => ({type: SET_PRODUCTS, payload});
// with redux-thunk
// мы поместили всю логику фетчинга в данный экшн, чтобы можно было ее переиспользовать в разных сценариях (функция, асинк; без thunk - в экшене можем использовать только плейн обджект)
const loadProducts = (params) => async (dispatch, getState) => {
  const hasItems = !!getState().productsReducer.products.length;

  try {
    !hasItems && dispatch(startProductsLoading());
    const rawData = await fetch(`https://fakestoreapi.com/products?${qsHelper(params)}`);
    const jsonData = await rawData.json();
    dispatch(setProducts(jsonData));
    // dispatch(setProducts(jsonData.filter(el => el.price > 100))); // as example of logic applying at the action...
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(endProductsLoading());
  }
}

export {
  startProductsLoading,
  endProductsLoading,
  setProducts,
  loadProducts,
}
