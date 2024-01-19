import React, { useEffect, useState } from "react";
import { fetchProducts } from "../service/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  return <div>ProductList</div>;
};

export default ProductList;
