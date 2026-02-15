import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userAPI, medicineAPI, orderAPI } from '../services/api';
import { getDonors, getRequests, updateDonorStatus, updateRequestStatus } from '../services/bloodbankService';
import { User, Medicine } from '../types';
import './AdminPanel.css';



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
  /* Removed loadUsers function */

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Stats state
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    setLoading(true); // Added setLoading(true) here as it was in the original fetchData
    try {
      const [usersRes, medicinesRes, ordersRes] = await Promise.all([
        userAPI.getAll(),
        medicineAPI.getAll(),
        orderAPI.getOrders()
      ]);

      setUsers(usersRes.data);
      setMedicines(medicinesRes.data);

      const orders = ordersRes.data;
      const revenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
      const pending = orders.filter(o => o.status === 'pending').length;

      setStats({
        totalUsers: usersRes.data.length,
        totalOrders: orders.length,
        totalRevenue: revenue,
        pendingOrders: pending
      });

      // Format recent orders for display
      const formattedRecent = orders.slice(0, 5).map(order => ({
        id: order.id,
        user: order.userId, // In a real app we'd map this to a name
        amount: order.total,
        status: order.status,
        date: new Date(order.createdAt || Date.now()).toLocaleDateString()
      }));
      setRecentOrders(formattedRecent);

    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDashboardData();
  }, []);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User', status: 'Active' });

  // Load blood donors and requests from API
  const [bloodDonors, setBloodDonors] = useState<BloodDonor[]>([]);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);

  useEffect(() => {
    fetchBloodBankData();
  }, []);

  const fetchBloodBankData = async () => {
    try {
      const donors = await getDonors();
      const requests = await getRequests();

      // Map API data to component state shape if necessary
      // Assuming API returns data matching interfaces or close enough
      // We might need to map 'blood_group' to 'bloodGroup', etc.

      const formattedDonors = donors.map((d: any) => ({
        id: d.id,
        name: d.name,
        email: d.email,
        phone: d.phone,
        bloodGroup: d.blood_group,
        age: d.age,
        weight: d.weight,
        registeredDate: new Date(d.created_at).toLocaleDateString(),
        status: d.status
      }));

      const formattedRequests = requests.map((r: any) => ({
        id: r.id,
        patient: r.patient_name,
        bloodType: r.blood_group,
        units: r.units_needed,
        status: r.status,
        date: new Date(r.created_at).toLocaleDateString(),
        hospital: r.hospital_name,
        contactPhone: r.contact_phone,
        urgency: r.urgency
      }));

      setBloodDonors(formattedDonors);
      setBloodRequests(formattedRequests);
    } catch (error) {
      console.error("Error fetching blood bank data:", error);
    }
  };



  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [newMedicine, setNewMedicine] = useState({ name: '', price: 0, description: '', category: '', stock: 0 });

  const [contactInfo, setContactInfo] = useState(() => {
    const saved = localStorage.getItem('contactInfo');
    return saved ? JSON.parse(saved) : {
      phone: '+91 9876543210',
      email: 'support@medicare.com',
      address: 'Mumbai, Maharashtra, India'
    };
  });

  const totalStock = medicines.reduce((sum, m) => sum + m.stock, 0);
  const totalMedicines = medicines.length;

  const handleApproveDonor = async (id: number) => {
    try {
      await updateDonorStatus(id, 'Approved');
      setBloodDonors(bloodDonors.map(d => d.id === id ? { ...d, status: 'Approved' } : d));
    } catch (error) {
      console.error("Error approving donor:", error);
      alert("Failed to approve donor");
    }
  };

  const handleRejectDonor = async (id: number) => {
    try {
      await updateDonorStatus(id, 'Rejected');
      setBloodDonors(bloodDonors.map(d => d.id === id ? { ...d, status: 'Rejected' } : d));
    } catch (error) {
      console.error("Error rejecting donor:", error);
      alert("Failed to reject donor");
    }
  };

  const handleApproveRequest = async (id: number) => {
    try {
      await updateRequestStatus(id, 'Approved');
      setBloodRequests(bloodRequests.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve request");
    }
  };

  const handleRejectRequest = async (id: number) => {
    try {
      await updateRequestStatus(id, 'Rejected');
      setBloodRequests(bloodRequests.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject request");
    }
  };

  const handleAddMedicine = async () => {
    if (newMedicine.name && newMedicine.price && newMedicine.category) {
      try {
        const res = await medicineAPI.create(newMedicine);
        setMedicines([...medicines, res.data]);
        setNewMedicine({ name: '', price: 0, description: '', category: '', stock: 0 });
        setShowAddMedicine(false);
      } catch (error) {
        console.error("Error adding medicine:", error);
        alert("Failed to add medicine");
      }
    }
  };

  const handleDeleteMedicine = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await medicineAPI.delete(id);
        setMedicines(medicines.filter(m => m.id !== id));
      } catch (error) {
        console.error("Error deleting medicine:", error);
        alert("Failed to delete medicine");
      }
    }
  };

  const handleEditMedicine = (medicine: Medicine) => {
    setEditingMedicine({ ...medicine });
  };

  const handleUpdateMedicine = async () => {
    if (editingMedicine) {
      try {
        await medicineAPI.update(editingMedicine.id, editingMedicine);
        setMedicines(medicines.map(m => m.id === editingMedicine.id ? editingMedicine : m));
        setEditingMedicine(null);
      } catch (error) {
        console.error("Error updating medicine:", error);
        alert("Failed to update medicine");
      }
    }
  };

  const handleSaveContactInfo = () => {
    localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
    alert('Contact information updated successfully!');
  };

  const handleAddUser = async () => {
    if (newUser.name && newUser.email) {
      // Admin creating user usually implies generic password or handled via invite
      // For now, we'll strip this or add a default password if backend requires it
      // The backend register endpoint requires password.
      const defaultPassword = "password123";
      try {
        await userAPI.register({ ...newUser, password: defaultPassword, phone: '0000000000' } as any);
        // Refresh list
        const res = await userAPI.getAll();
        setUsers(res.data);
        setNewUser({ name: '', email: '', role: 'User', status: 'Active' });
        setShowAddUser(false);
      } catch (error) {
        console.error("Error adding user:", error);
        alert("Failed to add user");
      }
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.deleteUser(id.toString());
        setUsers(users.filter((user: User) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      }
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
  };

  const handleUpdateUser = async () => {
    if (editingUser) {
      try {
        await userAPI.updateProfile(editingUser.id.toString(), editingUser);
        setUsers(users.map((user: User) => user.id === editingUser.id ? editingUser : user));
        setEditingUser(null);
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user");
      }
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
                <h3>Total Medicines</h3>
                <p className="stat-number">{totalMedicines}</p>
              </div>
              <div className="stat-card">
                <h3>Total Stock</h3>
                <p className="stat-number">{totalStock}</p>
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
            <h1>Medicine Management</h1>
            <div className="products-actions">
              <button className="btn btn-primary" onClick={() => setShowAddMedicine(!showAddMedicine)}>
                {showAddMedicine ? 'Cancel' : 'Add New Medicine'}
              </button>
              <Link to="/catalog" className="btn btn-secondary">Browse Medicines</Link>
            </div>

            {showAddMedicine && (
              <div className="add-user-form">
                <h3>Add New Medicine</h3>
                <input type="text" placeholder="Name" value={newMedicine.name} onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })} />
                <input type="number" placeholder="Price" value={newMedicine.price || ''} onChange={(e) => setNewMedicine({ ...newMedicine, price: Number(e.target.value) })} />
                <input type="text" placeholder="Description" value={newMedicine.description} onChange={(e) => setNewMedicine({ ...newMedicine, description: e.target.value })} />
                <input type="text" placeholder="Category" value={newMedicine.category} onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })} />
                <input type="number" placeholder="Stock" value={newMedicine.stock || ''} onChange={(e) => setNewMedicine({ ...newMedicine, stock: Number(e.target.value) })} />
                <button className="btn btn-primary" onClick={handleAddMedicine}>Save Medicine</button>
              </div>
            )}

            {editingMedicine && (
              <div className="edit-user-modal">
                <div className="modal-content">
                  <h3>Edit Medicine</h3>
                  <input type="text" value={editingMedicine.name} onChange={(e) => setEditingMedicine({ ...editingMedicine, name: e.target.value })} />
                  <input type="number" value={editingMedicine.price} onChange={(e) => setEditingMedicine({ ...editingMedicine, price: Number(e.target.value) })} />
                  <input type="text" value={editingMedicine.description} onChange={(e) => setEditingMedicine({ ...editingMedicine, description: e.target.value })} />
                  <input type="text" value={editingMedicine.category} onChange={(e) => setEditingMedicine({ ...editingMedicine, category: e.target.value })} />
                  <input type="number" value={editingMedicine.stock} onChange={(e) => setEditingMedicine({ ...editingMedicine, stock: Number(e.target.value) })} />
                  <div className="modal-actions">
                    <button className="btn btn-primary" onClick={handleUpdateMedicine}>Update</button>
                    <button className="btn-small" onClick={() => setEditingMedicine(null)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

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
                {medicines.map(medicine => (
                  <tr key={medicine.id}>
                    <td>{medicine.id}</td>
                    <td>{medicine.name}</td>
                    <td>{medicine.category}</td>
                    <td>₹{medicine.price}</td>
                    <td>{medicine.stock}</td>
                    <td>
                      <button className="btn-small" onClick={() => handleEditMedicine(medicine)}>Edit</button>
                      <button className="btn-small btn-danger" onClick={() => handleDeleteMedicine(medicine.id)}>Delete</button>
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
              <h2>Contact Information</h2>
              <div className="form-group">
                <label>Contact Phone</label>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Contact Email</label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                />
              </div>
              <button className="btn btn-primary" onClick={handleSaveContactInfo}>Save Contact Info</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
