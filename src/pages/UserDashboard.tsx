import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserRequests } from '../services/bloodbankService';
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
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  // Use user data from context, fallback to defaults if not loaded yet
  const userInfo = {
    name: user?.name || 'User',
    email: user?.email || ''
  };

  const [orders, setOrders] = useState<Order[]>([
    { id: 'ORD001', items: 'Paracetamol, Bandage', amount: 80, status: 'Delivered', date: '2026-02-08' },
    { id: 'ORD002', items: 'Thermometer', amount: 150, status: 'Processing', date: '2026-02-10' }
  ]);
  const [bloodRequests, setBloodRequests] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const fetchBloodRequests = async () => {
        try {
          const data = await getUserRequests(user.id);
          setBloodRequests(data);
        } catch (error) {
          console.error("Error fetching blood requests:", error);
        }
      };
      fetchBloodRequests();
    }
  }, [user]);

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
          <button className={activeTab === 'medicines' ? 'active' : ''} onClick={() => setActiveTab('medicines')}>
            Book Medicines
          </button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            My Orders
          </button>
          <button className={activeTab === 'blood-requests' ? 'active' : ''} onClick={() => setActiveTab('blood-requests')}>
            Blood Requests
          </button>
          <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
            Profile
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
                <button className="action-btn" onClick={() => setActiveTab('medicines')}>
                  🛒 Book Medicines
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

        {activeTab === 'medicines' && (
          <div className="medicines-view">
            <h1>Book Medicines</h1>
            <p className="section-info">Browse and book medicines. Your orders will be reviewed by admin.</p>
            <div className="medicines-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div className="medicine-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h3>Paracetamol</h3>
                <p><strong>Price:</strong> ₹25.00</p>
                <p><strong>Category:</strong> Pain Relief</p>
                <p><strong>Description:</strong> Pain relief and fever reducer</p>
                <button className="btn btn-primary" style={{ marginTop: '10px', width: '100%' }}>Book Now</button>
              </div>
              <div className="medicine-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h3>Amoxicillin</h3>
                <p><strong>Price:</strong> ₹120.00</p>
                <p><strong>Category:</strong> Antibiotics</p>
                <p><strong>Description:</strong> Antibiotic for bacterial infections</p>
                <button className="btn btn-primary" style={{ marginTop: '10px', width: '100%' }}>Book Now</button>
              </div>
              <div className="medicine-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h3>Cetirizine</h3>
                <p><strong>Price:</strong> ₹45.00</p>
                <p><strong>Category:</strong> Allergy</p>
                <p><strong>Description:</strong> Antihistamine for allergies</p>
                <button className="btn btn-primary" style={{ marginTop: '10px', width: '100%' }}>Book Now</button>
              </div>
              <div className="medicine-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h3>Omeprazole</h3>
                <p><strong>Price:</strong> ₹80.00</p>
                <p><strong>Category:</strong> Digestive</p>
                <p><strong>Description:</strong> Acid reflux and heartburn relief</p>
                <button className="btn btn-primary" style={{ marginTop: '10px', width: '100%' }}>Book Now</button>
              </div>
              <div className="medicine-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h3>Aspirin</h3>
                <p><strong>Price:</strong> ₹30.00</p>
                <p><strong>Category:</strong> Pain Relief</p>
                <p><strong>Description:</strong> Pain relief and blood thinner</p>
                <button className="btn btn-primary" style={{ marginTop: '10px', width: '100%' }}>Book Now</button>
              </div>
              <div className="medicine-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h3>Metformin</h3>
                <p><strong>Price:</strong> ₹150.00</p>
                <p><strong>Category:</strong> Diabetes</p>
                <p><strong>Description:</strong> Diabetes medication</p>
                <button className="btn btn-primary" style={{ marginTop: '10px', width: '100%' }}>Book Now</button>
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
                    <td>
                      <span className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'blood-requests' && (
          <div className="orders-view">
            <h1>My Blood Requests</h1>
            {bloodRequests.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Blood Group</th>
                    <th>Units</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bloodRequests.map(req => (
                    <tr key={req.id}>
                      <td>{req.id}</td>
                      <td>{req.patient_name}</td>
                      <td>{req.blood_group}</td>
                      <td>{req.units_needed}</td>
                      <td>
                        <span className={`status ${req.status.toLowerCase()}`}>
                          {req.status}
                        </span>
                      </td>
                      <td>{new Date(req.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No blood requests found.</p>
            )}
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
