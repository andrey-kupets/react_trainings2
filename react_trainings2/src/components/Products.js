import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {loadProducts, toggleItemInCart, toggleItemInWishlist} from "../redux/action-creators";
import { Product } from "./Product";

export const Products = () => {
  const { products, isLoading } = useSelector(({productsReducer: productsObj }) => productsObj) // rename by the way
  const { productsInCart } = useSelector(store => store.cart);
  const { productsInWishlist } = useSelector(store => store.wishlist);
  const dispatch = useDispatch();

  // change by redux-thunk
  // const fetchProductsData = async () => {
  //   try {
  //     dispatch(startProductsLoading());
  //     const rawData = await fetch('https://fakestoreapi.com/products');
  //     const jsonData = await rawData.json();
  //     dispatch(setProducts(jsonData));
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //     dispatch(endProductsLoading());
  //   }
  // }

  useEffect(() => {
    // fetchProductsData();
    dispatch(loadProducts());
  }, [])

  return (
    <div className='product-wrapper'>
      {isLoading && (
        <h2 style={{ color: 'red' }}>LOADING...</h2>
      )}
      {
        !isLoading && products.length && // may or may not
        products.map(el => (
          <Product
            key={el.id}
            product={el}
            onCartClick={() => dispatch(toggleItemInCart(el.id))}
            onWishlistClick={() => dispatch(toggleItemInWishlist(el.id))}
            isInCart={productsInCart.includes(el.id)}
            isInWishlist={productsInWishlist.includes(el.id)}
          />
        ))}
    </div>
  )
}
