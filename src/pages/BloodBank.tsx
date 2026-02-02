import React, { useState } from 'react';
import './BloodBank.css';

const BloodBank: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'donate' | 'request' | 'inventory'>('donate');
  const [donorForm, setDonorForm] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    age: '',
    weight: ''
  });
  const [requestForm, setRequestForm] = useState({
    patientName: '',
    bloodGroup: '',
    unitsNeeded: '',
    urgency: 'medium',
    hospital: '',
    contactPhone: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const mockInventory = [
    { bloodGroup: 'A+', units: 25, expiry: '2024-03-15' },
    { bloodGroup: 'A-', units: 12, expiry: '2024-03-20' },
    { bloodGroup: 'B+', units: 18, expiry: '2024-03-18' },
    { bloodGroup: 'B-', units: 8, expiry: '2024-03-22' },
    { bloodGroup: 'AB+', units: 15, expiry: '2024-03-25' },
    { bloodGroup: 'AB-', units: 6, expiry: '2024-03-28' },
    { bloodGroup: 'O+', units: 30, expiry: '2024-03-12' },
    { bloodGroup: 'O-', units: 10, expiry: '2024-03-30' }
  ];

  const handleDonorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donor registration:', donorForm);
    alert('Thank you for registering as a blood donor! We will contact you soon.');
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Blood request:', requestForm);
    alert('Your blood request has been submitted. We will process it immediately.');
  };

  return (
    <div className="blood-bank-page">
      <div className="container">
        <div className="blood-bank-header">
          <h1>🩸 Blood Bank Services</h1>
          <p>Save lives through blood donation and help those in need</p>
        </div>

        <div className="blood-bank-tabs">
          <button 
            className={`tab ${activeTab === 'donate' ? 'active' : ''}`}
            onClick={() => setActiveTab('donate')}
          >
            Donate Blood
          </button>
          <button 
            className={`tab ${activeTab === 'request' ? 'active' : ''}`}
            onClick={() => setActiveTab('request')}
          >
            Request Blood
          </button>
          <button 
            className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            Blood Inventory
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'donate' && (
            <div className="donate-section">
              <div className="section-header">
                <h2>Register as Blood Donor</h2>
                <p>Your donation can save up to 3 lives</p>
              </div>
              
              <div className="donor-requirements">
                <h3>Donor Requirements:</h3>
                <ul>
                  <li>Age: 18-65 years</li>
                  <li>Weight: Minimum 50kg</li>
                  <li>Good general health</li>
                  <li>No recent illness or medication</li>
                  <li>Last donation: At least 3 months ago</li>
                </ul>
              </div>

              <form onSubmit={handleDonorSubmit} className="donor-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={donorForm.name}
                      onChange={(e) => setDonorForm({...donorForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={donorForm.email}
                      onChange={(e) => setDonorForm({...donorForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={donorForm.phone}
                      onChange={(e) => setDonorForm({...donorForm, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Blood Group</label>
                    <select
                      value={donorForm.bloodGroup}
                      onChange={(e) => setDonorForm({...donorForm, bloodGroup: e.target.value})}
                      required
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Age</label>
                    <input
                      type="number"
                      min="18"
                      max="65"
                      value={donorForm.age}
                      onChange={(e) => setDonorForm({...donorForm, age: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Weight (kg)</label>
                    <input
                      type="number"
                      min="50"
                      value={donorForm.weight}
                      onChange={(e) => setDonorForm({...donorForm, weight: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <button type="submit" className="btn btn-primary">Register as Donor</button>
              </form>
            </div>
          )}

          {activeTab === 'request' && (
            <div className="request-section">
              <div className="section-header">
                <h2>Request Blood</h2>
                <p>Submit your blood requirement details</p>
              </div>

              <form onSubmit={handleRequestSubmit} className="request-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Patient Name</label>
                    <input
                      type="text"
                      value={requestForm.patientName}
                      onChange={(e) => setRequestForm({...requestForm, patientName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Blood Group Needed</label>
                    <select
                      value={requestForm.bloodGroup}
                      onChange={(e) => setRequestForm({...requestForm, bloodGroup: e.target.value})}
                      required
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Units Needed</label>
                    <input
                      type="number"
                      min="1"
                      value={requestForm.unitsNeeded}
                      onChange={(e) => setRequestForm({...requestForm, unitsNeeded: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Urgency Level</label>
                    <select
                      value={requestForm.urgency}
                      onChange={(e) => setRequestForm({...requestForm, urgency: e.target.value})}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High - Emergency</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Hospital Name</label>
                    <input
                      type="text"
                      value={requestForm.hospital}
                      onChange={(e) => setRequestForm({...requestForm, hospital: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Phone</label>
                    <input
                      type="tel"
                      value={requestForm.contactPhone}
                      onChange={(e) => setRequestForm({...requestForm, contactPhone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit Request</button>
              </form>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="inventory-section">
              <div className="section-header">
                <h2>Current Blood Inventory</h2>
                <p>Real-time availability of blood units</p>
              </div>

              <div className="inventory-grid">
                {mockInventory.map(item => (
                  <div key={item.bloodGroup} className="inventory-card">
                    <div className="blood-group">{item.bloodGroup}</div>
                    <div className="units-available">
                      <span className="units">{item.units}</span>
                      <span className="label">Units Available</span>
                    </div>
                    <div className="expiry">Expires: {item.expiry}</div>
                    <div className={`status ${item.units > 15 ? 'good' : item.units > 5 ? 'low' : 'critical'}`}>
                      {item.units > 15 ? 'Good Stock' : item.units > 5 ? 'Low Stock' : 'Critical'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="emergency-contact">
                <h3>🚨 Emergency Blood Service</h3>
                <p>For urgent blood requirements, call our 24/7 hotline:</p>
                <div className="hotline">📞 1800-BLOOD-HELP (1800-256-634)</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodBank;
