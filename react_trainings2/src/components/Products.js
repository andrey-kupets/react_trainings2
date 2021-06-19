import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import {loadProducts, toggleItemInCart, toggleItemInWishlist} from "../redux/action-creators";
import {Product} from "./Product";

const LIMIT_STEP = 5;

export const Products = () => {
  const { products, isLoading } = useSelector(({productsReducer: productsObj }) => productsObj) // rename by the way
  const { productsInCart } = useSelector(store => store.cart);
  const { productsInWishlist } = useSelector(store => store.wishlist);
  const dispatch = useDispatch();
  const history = useHistory(); // pass to the product image to be able add cart/wishlist items w/o entering a single product component
  const [currentLimit, setCurrentLimit] = useState(LIMIT_STEP);

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
    dispatch(loadProducts({limit: currentLimit}));
  }, [currentLimit]);

  return (
    <>
      <div className='product-wrapper'>
        {isLoading && (
          <h2 style={{ color: 'red' }}>LOADING...</h2>
        )}
        {
          !isLoading && products.length && // may or may not
          products.map(el => (
            <div key={el.id} className='product-item'
                 // onClick={() => history.push(`/products/${el.id}`)} // entering in product component
            >
              <Product

                product={el}
                onCartClick={() => dispatch(toggleItemInCart(el.id))}
                onWishlistClick={() => dispatch(toggleItemInWishlist(el.id))}
                isInCart={productsInCart.includes(el.id)}
                isInWishlist={productsInWishlist.includes(el.id)}
              />
            </div>
          ))}

      </div>
      {products.length < 20 && <button onClick={() => setCurrentLimit(prev => prev += LIMIT_STEP)}>load more</button>}
    </>
  )
}
