import React, { useEffect, useState } from "react";

const EditProductForm = ({ productId, onClose, fetchProducts }) => {
  const [formData, setFormData] = useState({}); // Initial state with product data
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch product data based on productId (replace with your API call)
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((product) => setFormData(product));
  }, [productId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (!formData.name) {
      validationErrors.name = "Product name is required";
    }
    if (!formData.price) {
      validationErrors.price = "Product price is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          fetchProducts();
          onClose();
        } else {
          console.error("Error updating product:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <span className="error">{errors.price}</span>}
      </div>
      {/* Add other form fields as needed */}
      <button type="submit">Update Product</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default EditProductForm;
