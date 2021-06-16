import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {loadProducts, toggleItemInCart, toggleItemInWishlist} from "../redux/action-creators";


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
        // !isLoading && products.length && // may or may not
        products.map(el => (
          <div key={el.id} className='product-item'>
            <img style={{ height: 200, width: 200}} src={el.image} alt={el.title}/>
            <p>{el.title}</p>
            <p>Price: {el.price}</p>
            <p>Category: {el.category}</p>
            <button
              style={{
                background: productsInWishlist.includes(el.id) ? 'coral' : 'lightgreen'
              }}
              onClick={() => dispatch(toggleItemInWishlist(el.id))}>{
              productsInWishlist.includes(el.id) ? 'remove from wishlist' : 'add to wishlist'
            }
            </button>
            <button
              style={{
                background: productsInCart.includes(el.id) ? 'coral' : 'lightgreen'
              }}
              onClick={() => dispatch(toggleItemInCart(el.id))}>{
              productsInCart.includes(el.id) ? 'remove from cart' : 'add to cart'
            }
            </button>
          </div>
        ))}
    </div>
  )
}
