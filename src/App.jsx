import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Footer from './Components/Footer/Footer';
import Products from './Components/Products/Products';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Navigate to="home" />} /> 
        <Route path="home" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
