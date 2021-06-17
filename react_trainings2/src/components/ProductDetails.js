import React from "react";
import { useParams } from "react-router-dom";
import {Product} from "./Product";

export const ProductDetails = () => {
  const params = useParams();
  console.log(params)

  return (
    <div className='product-item'>
      {/*<Product/>*/}777
    </div>
  )
}


