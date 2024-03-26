import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Footer from './Components/Footer/Footer';
import Products from './Components/Products/Products';
import ProductDetails from './Components/productDetails/ProductDetails';
import Cart from './Components/Cart/Cart';
import CheckOut from './Components/CheckOut/CheckOut';
import Success from "./Components/Success/SuccessPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Navigate to="home" />} /> 
        <Route path="home" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
