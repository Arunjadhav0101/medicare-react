import React, { useState, useEffect } from 'react';
import { Medicine } from '../types';
import './Catalog.css';

const Catalog: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{[key: number]: number}>({});

  // Mock data - replace with API call
  useEffect(() => {
    const mockMedicines: Medicine[] = [
      {
        id: 1,
        name: 'Paracetamol',
        price: 25,
        description: 'Pain relief and fever reducer',
        category: 'Pain Relief',
        stock: 100
      },
      {
        id: 2,
        name: 'Amoxicillin',
        price: 120,
        description: 'Antibiotic for bacterial infections',
        category: 'Antibiotics',
        stock: 50
      },
      {
        id: 3,
        name: 'Cetirizine',
        price: 45,
        description: 'Antihistamine for allergies',
        category: 'Allergy',
        stock: 75
      },
      {
        id: 4,
        name: 'Omeprazole',
        price: 80,
        description: 'Acid reflux and heartburn relief',
        category: 'Digestive',
        stock: 60
      },
      {
        id: 5,
        name: 'Aspirin',
        price: 30,
        description: 'Pain relief and blood thinner',
        category: 'Pain Relief',
        stock: 90
      },
      {
        id: 6,
        name: 'Metformin',
        price: 150,
        description: 'Diabetes medication',
        category: 'Diabetes',
        stock: 40
      }
    ];
    setMedicines(mockMedicines);
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

  return (
    <div className="catalog-page">
      <div className="container">
        <div className="catalog-header">
          <h1>Medicine Catalog</h1>
          <p>Find the medicines you need with our comprehensive catalog</p>
        </div>

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
