import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import ProductManagement from "./components/ProductManagement";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/manage-products" element={<ProductManagement />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
