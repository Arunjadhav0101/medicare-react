import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = {
    totalUsers: 1250,
    totalOrders: 3420,
    totalRevenue: 125000,
    pendingOrders: 45
  };

  const recentOrders = [
    { id: 'ORD001', user: 'John Doe', amount: 450, status: 'Pending', date: '2026-02-10' },
    { id: 'ORD002', user: 'Jane Smith', amount: 320, status: 'Completed', date: '2026-02-10' },
    { id: 'ORD003', user: 'Mike Johnson', amount: 680, status: 'Processing', date: '2026-02-09' }
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Admin', status: 'Active' }
  ];

  const products = [
    { id: 1, name: 'Paracetamol', category: 'Medicine', price: 50, stock: 500 },
    { id: 2, name: 'Bandage', category: 'First Aid', price: 30, stock: 200 },
    { id: 3, name: 'Thermometer', category: 'Equipment', price: 150, stock: 100 }
  ];

  const bloodRequests = [
    { id: 1, patient: 'Sarah Wilson', bloodType: 'O+', units: 2, status: 'Urgent', date: '2026-02-10' },
    { id: 2, patient: 'Tom Brown', bloodType: 'A-', units: 1, status: 'Pending', date: '2026-02-09' }
  ];

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav className="admin-nav">
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            Dashboard
          </button>
          <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
            Users
          </button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            Orders
          </button>
          <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
            Products
          </button>
          <button className={activeTab === 'blood' ? 'active' : ''} onClick={() => setActiveTab('blood')}>
            Blood Bank
          </button>
          <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            Settings
          </button>
        </nav>
      </div>

      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p className="stat-number">{stats.totalUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p className="stat-number">{stats.totalOrders}</p>
              </div>
              <div className="stat-card">
                <h3>Revenue</h3>
                <p className="stat-number">₹{stats.totalRevenue}</p>
              </div>
              <div className="stat-card">
                <h3>Pending Orders</h3>
                <p className="stat-number">{stats.pendingOrders}</p>
              </div>
            </div>
            <div className="recent-activity">
              <h2>Recent Orders</h2>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.user}</td>
                      <td>₹{order.amount}</td>
                      <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                      <td>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <h1>User Management</h1>
            <button className="btn btn-primary">Add New User</button>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td><span className="status active">{user.status}</span></td>
                    <td>
                      <button className="btn-small">Edit</button>
                      <button className="btn-small btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h1>Order Management</h1>
            <div className="filters">
              <select>
                <option>All Orders</option>
                <option>Pending</option>
                <option>Processing</option>
                <option>Completed</option>
              </select>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.user}</td>
                    <td>₹{order.amount}</td>
                    <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                    <td>{order.date}</td>
                    <td>
                      <button className="btn-small">View</button>
                      <button className="btn-small">Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="products-section">
            <h1>Product Management</h1>
            <button className="btn btn-primary">Add New Product</button>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>₹{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button className="btn-small">Edit</button>
                      <button className="btn-small btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'blood' && (
          <div className="blood-section">
            <h1>Blood Bank Management</h1>
            <div className="blood-stats">
              <div className="blood-card">
                <h3>O+</h3>
                <p>45 Units</p>
              </div>
              <div className="blood-card">
                <h3>A+</h3>
                <p>32 Units</p>
              </div>
              <div className="blood-card">
                <h3>B+</h3>
                <p>28 Units</p>
              </div>
              <div className="blood-card">
                <h3>AB+</h3>
                <p>15 Units</p>
              </div>
            </div>
            <h2>Blood Requests</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Blood Type</th>
                  <th>Units</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bloodRequests.map(request => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.patient}</td>
                    <td>{request.bloodType}</td>
                    <td>{request.units}</td>
                    <td><span className={`status ${request.status.toLowerCase()}`}>{request.status}</span></td>
                    <td>{request.date}</td>
                    <td>
                      <button className="btn-small">Approve</button>
                      <button className="btn-small btn-danger">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <h1>Settings</h1>
            <div className="settings-form">
              <div className="form-group">
                <label>Site Name</label>
                <input type="text" defaultValue="MediCare" />
              </div>
              <div className="form-group">
                <label>Admin Email</label>
                <input type="email" defaultValue="admin@medicare.com" />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input type="tel" defaultValue="+91 1234567890" />
              </div>
              <div className="form-group">
                <label>Enable Notifications</label>
                <input type="checkbox" defaultChecked />
              </div>
              <button className="btn btn-primary">Save Settings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
