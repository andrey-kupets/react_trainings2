import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import { useHistory } from 'react-router-dom'

export const Header = () => {
    const { products } = useSelector(({productsReducer: productsObj }) => productsObj) // rename by the way
    // const  productsInCart  = useSelector(({cart: { productsInCart }}) => productsInCart) // may so
    // const  productsInCart  = useSelector(store => store.cart.productsInCart); // or so
    const { productsInCart } = useSelector(store => store.cart); // but like this way
    const { productsInWishlist } = useSelector(store => store.wishlist); // but like this way
    const history = useHistory();

    const addToCartSum = useMemo(() => {
      return products
        // .filter(el => productsInCart.includes(el.id))
        // .reduce((acc, el) => acc += el.price, 0);

        .reduce((acc, el) => { // done by one method
          // if (productsInCart.includes(el.id)) {
          //   acc += el.price;
          // }

          return productsInCart.includes(el.id) ? acc += el.price : acc;
        },0);
    }, [products, productsInCart]);

    const addToWishlistSum = useMemo(() => {
      return products.reduce((acc, el) => productsInWishlist.includes(el.id) ? acc += el.price : acc, 0); // by one string

      // .filter(el => productsInWishlist.includes(el.id))
        // .reduce((acc, el) => acc += el.price, 0);
    }, [products, productsInWishlist]);

    return (
      <header>
        <h2 onClick={() => history.push('/')}>HEADER</h2>
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

