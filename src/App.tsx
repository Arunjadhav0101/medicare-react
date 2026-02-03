// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Catalog from './pages/Catalog';
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import BloodBank from './pages/BloodBank';
// import Orders from './pages/Orders';
// import Chatbot from './components/Chatbot';
// import './App.css';

function App() {
  return (
    <Router>
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
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
