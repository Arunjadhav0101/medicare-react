import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">💊</span>
          <span className="logo-text">MediCare</span>
        </Link>
        
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blood-bank">Blood Bank</Link></li>
          <li><Link to="/catalog">Catalog</Link></li>
          <li><Link to="/orders">My Orders</Link></li>
          <li><Link to="/login" className="btn-login">Login</Link></li>
          <li><Link to="/signup" className="btn-signup">Sign Up</Link></li>
        </ul>
        
        <div 
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
