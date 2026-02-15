import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BloodBank from './pages/BloodBank';
import Orders from './pages/Orders';
import AdminPanel from './pages/AdminPanel';
import UserDashboard from './pages/UserDashboard';
import Chatbot from './components/Chatbot';
import { AuthProvider } from './context/AuthContext';
import './App.css';

import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/blood-bank" element={<BloodBank />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
            </Routes>
            <Chatbot />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
