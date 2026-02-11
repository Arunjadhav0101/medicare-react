import React, { useState, useEffect } from 'react';
import { Medicine } from '../types';
import { getMedicines, saveMedicines } from '../data/medicines';
import './Catalog.css';

const Catalog: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
    stock: 0
  });

  useEffect(() => {
    setMedicines(getMedicines());
  }, []);

  const categories = ['all', ...Array.from(new Set(medicines.map(m => m.category)))];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (medicineId: number) => {
    setCart(prev => ({
      ...prev,
      [medicineId]: (prev[medicineId] || 0) + 1
    }));
  };

  const removeMedicine = (id: number) => {
    if (window.confirm('Are you sure you want to remove this medicine?')) {
      const updated = medicines.filter(m => m.id !== id);
      setMedicines(updated);
      saveMedicines(updated);
    }
  };

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.price && newMedicine.category) {
      const medicine: Medicine = {
        id: Math.max(...medicines.map(m => m.id), 0) + 1,
        ...newMedicine
      };
      const updated = [...medicines, medicine];
      setMedicines(updated);
      saveMedicines(updated);
      setNewMedicine({ name: '', price: 0, description: '', category: '', stock: 0 });
      setShowAddForm(false);
    }
  };

  return (
    <div className="catalog-page">
      <div className="container">
        <div className="catalog-header">
          <h1>Medicine Catalog</h1>
          <p>Find the medicines you need with our comprehensive catalog</p>
          <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : '+ Add New Medicine'}
          </button>
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
                  onClick={() => addToCart(medicine.id)}
                  disabled={medicine.stock === 0}
                >
                  {medicine.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeMedicine(medicine.id)}
                >
                  Remove
                </button>
                {cart[medicine.id] && (
                  <span className="cart-quantity">In cart: {cart[medicine.id]}</span>
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
