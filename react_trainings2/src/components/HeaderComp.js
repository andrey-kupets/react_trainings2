import React, {useMemo} from "react";
import {useSelector} from "react-redux";


export const Header = () => {
    const { products } = useSelector(({productsReducer: productsObj }) => productsObj) // rename by the way
    // const  productsInCart  = useSelector(({cart: { productsInCart }}) => productsInCart) // may so
    // const  productsInCart  = useSelector(store => store.cart.productsInCart); // or so
    const { productsInCart } = useSelector(store => store.cart); // but like this way
    const { productsInWishlist } = useSelector(store => store.wishlist); // but like this way

    const addToCartSum = useMemo(() => {
      return products
        .filter(el => productsInCart.includes(el.id))
        .reduce((acc, el) => acc += el.price, 0);
    }, [products, productsInCart]);
    const addToWishlistSum = useMemo(() => {
      return products
        .filter(el => productsInWishlist.includes(el.id))
        .reduce((acc, el) => acc += el.price, 0);
    }, [products, productsInWishlist]);

    return (
      <header>
        <h2>HEADER</h2>
        <div>
        <span>
          wishlist: {productsInWishlist.length} ( $ {addToWishlistSum})
        </span>
          <span>
            cart: {productsInCart.length} ( $ {addToCartSum})
        </span>
        </div>
      </header>
    )
  }

