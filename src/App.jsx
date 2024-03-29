import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Footer from './Components/Footer/Footer';
import HomePage from './pages/HomePage';
import ProductDetails from './Components/productDetails/ProductDetails';
import CartPage from './pages/CartPage';
import Success from "./Components/Success/SuccessPage"
import ChechOutPage from './pages/ChechOutPage';
import InvoicePage from './pages/InvoicePage';
import InvoiceDetailsPage from './pages/InvoiceDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Navigate to="home" />} /> 
        <Route path="home" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<ChechOutPage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/success" element={<Success />} />
        <Route path="/test/:id" element={<InvoiceDetailsPage />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
