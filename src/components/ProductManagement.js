import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProductForm from "./AddProductForm";

const ProductManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/");
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    //send a Get request to fetch products

    setProducts(fetchProducts);
  };

  const handleEditProduct = (productId) => {
    //...login to handle editing
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== productId));
      } else {
        // Handle deletion error
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  return (
    <div>
      <h2>Product Management</h2>
      {/* Display product list */}
      <table>
        {/* ... table rows with product data and Edit/Delete buttons */}
      </table>
      <AddProductForm />
    </div>
  );
};

export default ProductManagement;
