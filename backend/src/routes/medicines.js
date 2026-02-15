const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all medicines
router.get('/', async (req, res) => {
  try {
    const [medicines] = await db.query('SELECT * FROM medicines');
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add medicine
router.post('/', async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    const [result] = await db.query(
      'INSERT INTO medicines (name, price, description, category, stock) VALUES (?, ?, ?, ?, ?)',
      [name, price, description, category, stock]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update medicine
router.put('/:id', async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    await db.query(
      'UPDATE medicines SET name = ?, price = ?, description = ?, category = ?, stock = ? WHERE id = ?',
      [name, price, description, category, stock, req.params.id]
    );
    res.json({ message: 'Medicine updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete medicine
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM medicines WHERE id = ?', [req.params.id]);
    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
