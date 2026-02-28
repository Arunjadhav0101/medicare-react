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

  const [orders, setOrders] = useState<Order[]>([]);
  const [bloodRequests, setBloodRequests] = useState<any[]>([]);
  const [medicines, setMedicines] = useState<any[]>([]);

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
      const fetchOrders = async () => {
        try {
          const response = await fetch(`/api/orders/user/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setOrders(data);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
      fetchBloodRequests();
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('/api/medicines');
        if (response.ok) {
          const data = await response.json();
          setMedicines(data);
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };
    fetchMedicines();
  }, []);

  const handleBookMedicine = async (medicine: any) => {
    if (!user) {
      alert("Please login first to book medicines.");
      return;
    }
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          totalAmount: medicine.price,
          items: [{ medicineId: medicine.id, quantity: 1, price: medicine.price }]
        })
      });
      if (response.ok) {
        alert("Medicine booked successfully!");
        const ordersRes = await fetch(`/api/orders/user/${user.id}`);
        if (ordersRes.ok) {
          const data = await ordersRes.json();
          setOrders(data);
        }
        setActiveTab('orders');
      } else {
        alert("Failed to book medicine.");
      }
    } catch (error) {
      console.error("Error booking medicine:", error);
      alert("Error booking medicine.");
    }
  };

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
                <p className="stat-value">₹{orders.reduce((sum, o) => sum + Number(o.amount || 0), 0).toFixed(2)}</p>
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
              {medicines.map(medicine => (
                <div key={medicine.id} className="medicine-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                  <h3>{medicine.name}</h3>
                  <p><strong>Price:</strong> ₹{medicine.price}</p>
                  <p><strong>Category:</strong> {medicine.category}</p>
                  <p><strong>Description:</strong> {medicine.description}</p>
                  <button className="btn btn-primary" style={{ marginTop: '10px', width: '100%' }} onClick={() => handleBookMedicine(medicine)}>Book Now</button>
                </div>
              ))}
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
                {orders.map((order, index) => (
                  <tr key={order.id || index}>
                    <td>ORD{String(order.id).padStart(3, '0')}</td>
                    <td>{order.items}</td>
                    <td>₹{order.amount}</td>
                    <td>
                      <span className={`status ${(order.status || 'Pending').toLowerCase()}`}>
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td>{order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</td>
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
