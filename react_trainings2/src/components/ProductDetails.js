import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {Product} from "./Product";

export const ProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const params = useParams();

  const fetchItem = async () => {
    if (!params.id) return;

    try {
      setLoading(true);
      const rawData = await fetch(`https://fakestoreapi.com/products/${params.id}`);
      const jsonData = await rawData.json();
      setProduct(jsonData);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItem();
  }, [])

  return (
    <div>
      {/*в компоненту Продакт передаю пропсу "продакт" дважды - с этой компоненты и с Продактс*/}
      {/*и смотря с откуда производится рендер, т.е. как мы реЮзаем Продакт такое значение пропса и принимает*/}
      {!loading && !!product && <Product product={product}/>}
      {loading && (
        <h3>loading...</h3>
      )}
    </div>
  )
}


