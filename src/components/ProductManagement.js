import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";

const ProductManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/");
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products"); // Assuming your API endpoint for fetching products
      const fetchedProducts = await response.json();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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

  const handleEditProduct = (productId) => {
    setEditProductId(productId);
  };

  return (
    <div>
      <h2>Product Management</h2>

      {editProductId && (
        <EditProductForm
          productId={editProductId}
          onClose={() => setEditProductId(null)}
          // ... pass other necessary functions for updating product
        />
      )}

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>

              <td>{product.price}</td>

              <td>{product.description}</td>

              <td>
                <button onClick={() => handleEditProduct(product.id)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddProductForm />
    </div>
  );
};

export default ProductManagement;
