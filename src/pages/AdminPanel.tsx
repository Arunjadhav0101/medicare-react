import React, { useState } from 'react';
import './AdminPanel.css';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  phone?: string;
}

interface BloodDonor {
  id: number;
  name: string;
  email: string;
  phone: string;
  bloodGroup: string;
  age: string;
  weight: string;
  registeredDate: string;
  status: string;
}

interface BloodRequest {
  id: number;
  patient: string;
  bloodType: string;
  units: string | number;
  status: string;
  date: string;
  hospital?: string;
  contactPhone?: string;
  urgency?: string;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Load users from localStorage or use default
  const loadUsers = (): User[] => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      return JSON.parse(savedUsers);
    }
    return [
      { id: 1, name: 'Rahul Verma', email: 'rahul@example.com', role: 'User', status: 'Active' },
      { id: 2, name: 'Anjali Desai', email: 'anjali@example.com', role: 'User', status: 'Active' },
      { id: 3, name: 'Arjun Mehta', email: 'arjun@example.com', role: 'Admin', status: 'Active' }
    ];
  };
  
  const [users, setUsers] = useState<User[]>(loadUsers());
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User', status: 'Active' });

  // Load blood donors and requests from localStorage
  const [bloodDonors, setBloodDonors] = useState<BloodDonor[]>(() => {
    const saved = localStorage.getItem('bloodDonors');
    return saved ? JSON.parse(saved) : [];
  });

  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>(() => {
    const saved = localStorage.getItem('bloodRequests');
    return saved ? JSON.parse(saved) : [
      { id: 1, patient: 'Priya Sharma', bloodType: 'O+', units: 2, status: 'Urgent', date: '2026-02-10' },
      { id: 2, patient: 'Rajesh Kumar', bloodType: 'A-', units: 1, status: 'Pending', date: '2026-02-09' }
    ];
  });

  const stats = {
    totalUsers: users.length,
    totalOrders: 3420,
    totalRevenue: 125000,
    pendingOrders: 45
  };

  const recentOrders = [
    { id: 'ORD001', user: 'Amit Patel', amount: 450, status: 'Pending', date: '2026-02-10' },
    { id: 'ORD002', user: 'Sneha Reddy', amount: 320, status: 'Completed', date: '2026-02-10' },
    { id: 'ORD003', user: 'Vikram Singh', amount: 680, status: 'Processing', date: '2026-02-09' }
  ];

  const products = [
    { id: 1, name: 'Paracetamol', category: 'Medicine', price: 50, stock: 500 },
    { id: 2, name: 'Bandage', category: 'First Aid', price: 30, stock: 200 },
    { id: 3, name: 'Thermometer', category: 'Equipment', price: 150, stock: 100 }
  ];

  const handleApproveDonor = (id: number) => {
    const updated = bloodDonors.map(d => d.id === id ? { ...d, status: 'Approved' } : d);
    setBloodDonors(updated);
    localStorage.setItem('bloodDonors', JSON.stringify(updated));
  };

  const handleRejectDonor = (id: number) => {
    const updated = bloodDonors.map(d => d.id === id ? { ...d, status: 'Rejected' } : d);
    setBloodDonors(updated);
    localStorage.setItem('bloodDonors', JSON.stringify(updated));
  };

  const handleApproveRequest = (id: number) => {
    const updated = bloodRequests.map(r => r.id === id ? { ...r, status: 'Approved' } : r);
    setBloodRequests(updated);
    localStorage.setItem('bloodRequests', JSON.stringify(updated));
  };

  const handleRejectRequest = (id: number) => {
    const updated = bloodRequests.map(r => r.id === id ? { ...r, status: 'Rejected' } : r);
    setBloodRequests(updated);
    localStorage.setItem('bloodRequests', JSON.stringify(updated));
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const updatedUsers = [...users, { ...newUser, id: users.length + 1 }];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setNewUser({ name: '', email: '', role: 'User', status: 'Active' });
      setShowAddUser(false);
    }
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter((user: User) => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
  };

  const handleUpdateUser = () => {
    if (editingUser) {
      const updatedUsers = users.map((user: User) => user.id === editingUser.id ? editingUser : user);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setEditingUser(null);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-badge">Admin</div>
      
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
            <button className="btn btn-primary" onClick={() => setShowAddUser(!showAddUser)}>
              {showAddUser ? 'Cancel' : 'Add New User'}
            </button>

            {showAddUser && (
              <div className="add-user-form">
                <h3>Add New User</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
                <button className="btn btn-primary" onClick={handleAddUser}>Save User</button>
              </div>
            )}

            {editingUser && (
              <div className="edit-user-modal">
                <div className="modal-content">
                  <h3>Edit User</h3>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  />
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                  <select value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <div className="modal-actions">
                    <button className="btn btn-primary" onClick={handleUpdateUser}>Update</button>
                    <button className="btn-small" onClick={() => setEditingUser(null)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

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
                {users.map((user: User) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td><span className="status active">{user.status}</span></td>
                    <td>
                      <button className="btn-small" onClick={() => handleEditUser(user)}>Edit</button>
                      <button className="btn-small btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button>
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

            <h2>Blood Donor Registrations</h2>
            {bloodDonors.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Blood Group</th>
                    <th>Age</th>
                    <th>Weight (kg)</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bloodDonors.map(donor => (
                    <tr key={donor.id}>
                      <td>{donor.name}</td>
                      <td>{donor.email}</td>
                      <td>{donor.phone}</td>
                      <td>{donor.bloodGroup}</td>
                      <td>{donor.age}</td>
                      <td>{donor.weight}</td>
                      <td>{donor.registeredDate}</td>
                      <td><span className={`status ${donor.status.toLowerCase()}`}>{donor.status}</span></td>
                      <td>
                        {donor.status === 'Pending' && (
                          <>
                            <button className="btn-small" onClick={() => handleApproveDonor(donor.id)}>Approve</button>
                            <button className="btn-small btn-danger" onClick={() => handleRejectDonor(donor.id)}>Reject</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No blood donor registrations yet.</p>
            )}

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
                      {(request.status === 'Pending' || request.status === 'Urgent') && (
                        <>
                          <button className="btn-small" onClick={() => handleApproveRequest(request.id)}>Approve</button>
                          <button className="btn-small btn-danger" onClick={() => handleRejectRequest(request.id)}>Reject</button>
                        </>
                      )}
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
