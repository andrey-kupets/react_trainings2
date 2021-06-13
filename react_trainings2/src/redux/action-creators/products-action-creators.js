import {
  SET_PRODUCTS,
  START_PRODUCTS_LOADING,
  END_PRODUCTS_LOADING,
} from '../action-types';

const startProductsLoading = () => ({type: START_PRODUCTS_LOADING});
const endProductsLoading = () => ({type: END_PRODUCTS_LOADING});
const setProducts = (payload) => ({type: SET_PRODUCTS, payload});
// with redux-thunk
// мы поместили всю логику фетчинга в данный экшн, чтобы можно было ее переиспользовать в разных сценариях (функция, асинк; без thunk - в экшене можем использовать только плейн обджект)
const loadProducts = () => async (dispatch) => {
  try {
    dispatch(startProductsLoading());
    const rawData = await fetch('https://fakestoreapi.com/products');
    const jsonData = await rawData.json();
    dispatch(setProducts(jsonData));
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
