import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const AddProductForm = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: productName,
          price,
          description,
        }),
      });

      if (response.ok) {
        setError(null);
        console.log("Product added successfully!");
        setProductName("");
        setPrice("");
        setDescription("");

        Navigate("/product-list");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add product");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Product Name"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      {submitting && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
