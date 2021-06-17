import React from "react";

export const Product = ({product, onCartClick, onWishlistClick, isInCart, isInWishlist}) => (
  <div key={product.id}>
    <img style={{ height: 200, width: 200}} src={product.image} alt={product.title}/>
    <p>{product.title}</p>
    <p>Price: {product.price}</p>
    <p>Category: {product.category}</p>
    <button
      style={{
        background: isInWishlist ? 'coral' : 'lightgreen'
      }}
      onClick={onWishlistClick}>{
      isInWishlist ? 'remove from wishlist' : 'add to wishlist'
    }
    </button>
    <button
      style={{
        background: isInCart ? 'coral' : 'lightgreen'
      }}
      onClick={onCartClick}>{
      isInCart ? 'remove from cart' : 'add to cart'
    }
    </button>
    <hr/>
  </div>
)

