import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

interface Order {
  id: string;
  items: string;
  amount: number;
  status: string;
  date: string;
}

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userInfo, setUserInfo] = useState({ name: 'User', email: '' });
  const [orders, setOrders] = useState<Order[]>([
    { id: 'ORD001', items: 'Paracetamol, Bandage', amount: 80, status: 'Delivered', date: '2026-02-08' },
    { id: 'ORD002', items: 'Thermometer', amount: 150, status: 'Processing', date: '2026-02-10' }
  ]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length > 0) {
      const lastUser = users[users.length - 1];
      setUserInfo({ name: lastUser.name, email: lastUser.email });
    }
  }, []);

  return (
    <div className="user-dashboard">
      <div className="user-sidebar">
        <div className="user-profile">
          <div className="profile-icon">👤</div>
          <h3>{userInfo.name}</h3>
          <p>{userInfo.email}</p>
        </div>
        <nav className="user-nav">
          <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
            Overview
          </button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            My Orders
          </button>
          <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
            Profile
          </button>
          <button onClick={() => navigate('/catalog')}>
            Browse Catalog
          </button>
          <button onClick={() => navigate('/blood-bank')}>
            Blood Bank
          </button>
        </nav>
      </div>

      <div className="user-content">
        {activeTab === 'overview' && (
          <div className="overview">
            <h1>Welcome, {userInfo.name}!</h1>
            <div className="quick-stats">
              <div className="stat-box">
                <h3>Total Orders</h3>
                <p className="stat-value">{orders.length}</p>
              </div>
              <div className="stat-box">
                <h3>Active Orders</h3>
                <p className="stat-value">{orders.filter(o => o.status === 'Processing').length}</p>
              </div>
              <div className="stat-box">
                <h3>Total Spent</h3>
                <p className="stat-value">₹{orders.reduce((sum, o) => sum + o.amount, 0)}</p>
              </div>
            </div>
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-buttons">
                <button className="action-btn" onClick={() => navigate('/catalog')}>
                  🛒 Order Medicines
                </button>
                <button className="action-btn" onClick={() => navigate('/blood-bank')}>
                  🩸 Request Blood
                </button>
                <button className="action-btn" onClick={() => setActiveTab('orders')}>
                  📦 View Orders
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-view">
            <h1>My Orders</h1>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.items}</td>
                    <td>₹{order.amount}</td>
                    <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-view">
            <h1>My Profile</h1>
            <div className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={userInfo.name} readOnly />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={userInfo.email} readOnly />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="Not provided" readOnly />
              </div>
              <button className="btn btn-primary">Edit Profile</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
