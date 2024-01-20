import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddProductForm from "./AddProductForm";

const ProductManagement = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Product Management</h2>
      <AddProductForm />
    </div>
  );
};

export default ProductManagement;
