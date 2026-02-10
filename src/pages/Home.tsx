import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import medicareBg from "../assests/medicare.png";


const Home: React.FC = () => {
  return (
    <div className="home">
      <section className="hero"  style={{
     backgroundImage: `url(${medicareBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}>
        <div className="container hero-container">
          <div className="hero-content">
            
            <h1 className="hero-title">Your Health, Our Priority</h1>
            <p className="hero-subtitle">
              AI-powered online pharmacy with smart medicine recommendations and prescription management
            </p>
            <div className="hero-buttons">
              <Link to="/catalog" className="btn btn-primary">Browse Medicines</Link>
              <Link to="/signup" className="btn btn-secondary">Get Started</Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-card">
              <div className="card-icon">🏥</div>
              <h3>Trusted Service</h3>
              <p>Licensed pharmacists</p>
            </div>
            <div className="hero-card">
              <div className="card-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick & reliable</p>
            </div>
            <div className="hero-card">
              <div className="card-icon">💬</div>
              <h3>AI Assistant</h3>
              <p>Smart recommendations</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose MediCare?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Safe</h3>
              <p>Your data is protected with industry-standard encryption</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Service</h3>
              <p>Fast ordering process with instant confirmation</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🩸</div>
              <h3>Blood Bank</h3>
              <p>Complete blood donation and request management system</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Chatbot</h3>
              <p>Intelligent assistant for medicine ordering and queries</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
