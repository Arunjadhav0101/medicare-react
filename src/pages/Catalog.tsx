import React, { useState, useEffect } from 'react';
import { Medicine } from '../types';
import { medicineAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Catalog.css';

const Catalog: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { addToCart, cartItems } = useCart();
  const { user } = useAuth(); // If we want to show admin features conditionally

  // Calculate cart quantities map for UI
  const cartQuantities = cartItems.reduce((acc, item) => {
    // Handle both potential item structures
    const id = item.id || (item.medicine ? item.medicine.id : 0);
    acc[id] = item.quantity;
    return acc;
  }, {} as { [key: number]: number });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
    stock: 0
  });

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await medicineAPI.getAll();
        setMedicines(res.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  const categories = ['all', ...Array.from(new Set(medicines.map(m => m.category)))];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (medicine: Medicine) => {
    addToCart(medicine);
  };

  const removeMedicine = async (id: number) => {
    if (window.confirm('Are you sure you want to remove this medicine?')) {
      try {
        await medicineAPI.delete(id);
        setMedicines(medicines.filter(m => m.id !== id));
      } catch (error) {
        console.error("Error deleting medicine:", error);
        alert("Failed to delete medicine");
      }
    }
  };

  const handleAddMedicine = async () => {
    if (newMedicine.name && newMedicine.price && newMedicine.category) {
      try {
        const res = await medicineAPI.create(newMedicine);
        setMedicines([...medicines, res.data]);
        setNewMedicine({ name: '', price: 0, description: '', category: '', stock: 0 });
        setShowAddForm(false);
      } catch (error) {
        console.error("Error adding medicine:", error);
        alert("Failed to add medicine");
      }
    }
  };

  return (
    <div className="catalog-page">
      <div className="container">
        <div className="catalog-header">
          <h1>Medicine Catalog</h1>
          <p>Find the medicines you need with our comprehensive catalog</p>
          {user?.role === 'Admin' && (
            <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Cancel' : '+ Add New Medicine'}
            </button>
          )}
        </div>

        {showAddForm && (
          <div className="add-medicine-form">
            <h3>Add New Medicine</h3>
            <input
              type="text"
              placeholder="Medicine Name"
              value={newMedicine.name}
              onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newMedicine.price || ''}
              onChange={(e) => setNewMedicine({ ...newMedicine, price: Number(e.target.value) })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newMedicine.description}
              onChange={(e) => setNewMedicine({ ...newMedicine, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              value={newMedicine.category}
              onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Stock"
              value={newMedicine.stock || ''}
              onChange={(e) => setNewMedicine({ ...newMedicine, stock: Number(e.target.value) })}
            />
            <button className="btn btn-primary" onClick={handleAddMedicine}>Save Medicine</button>
          </div>
        )}

        <div className="catalog-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="medicines-grid">
          {filteredMedicines.map(medicine => (
            <div key={medicine.id} className="medicine-card">
              <div className="medicine-info">
                <h3>{medicine.name}</h3>
                <p className="medicine-description">{medicine.description}</p>
                <div className="medicine-details">
                  <span className="category">{medicine.category}</span>
                  <span className="stock">Stock: {medicine.stock}</span>
                </div>
                <div className="medicine-price">₹{medicine.price}</div>
              </div>
              <div className="medicine-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(medicine)}
                  disabled={medicine.stock === 0}
                >
                  {medicine.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                {user?.role === 'Admin' && (
                  <button
                    className="btn btn-danger"
                    onClick={() => removeMedicine(medicine.id)}
                  >
                    Remove
                  </button>
                )}
                {cartQuantities[medicine.id] && (
                  <span className="cart-quantity">In cart: {cartQuantities[medicine.id]}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="no-results">
            <p>No medicines found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
