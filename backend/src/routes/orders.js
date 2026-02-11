const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT o.*, u.name as user_name, u.email as user_email 
      FROM orders o 
      LEFT JOIN users u ON o.user_id = u.id
    `);
    res.json(orders || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create order
router.post('/', async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    const [result] = await db.query(
      'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
      [userId, totalAmount]
    );
    
    const orderId = result.insertId;
    
    // Insert order items
    for (const item of items) {
      await db.query(
        'INSERT INTO order_items (order_id, medicine_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.medicineId, item.quantity, item.price]
      );
    }
    
    res.status(201).json({ id: orderId, message: 'Order created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update order status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
