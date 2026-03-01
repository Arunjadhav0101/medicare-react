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

// Get orders by user id
router.get('/user/:userId', async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT o.id, o.total_amount as amount, o.status, o.created_at as date,
             GROUP_CONCAT(m.name SEPARATOR ', ') as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN medicines m ON oi.medicine_id = m.id
      WHERE o.user_id = ?
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [req.params.userId]);
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

// Get order by id
router.get('/:id', async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT o.id, o.total_amount as amount, o.status, o.created_at as date,
             u.name as user_name, u.email as user_email
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      WHERE o.id = ?
    `, [req.params.id]);

    if (orders.length === 0) return res.status(404).json({ message: 'Order not found' });

    const [items] = await db.query(`
      SELECT oi.quantity, oi.price, m.name as medicineName, m.category
      FROM order_items oi
      LEFT JOIN medicines m ON oi.medicine_id = m.id
      WHERE oi.order_id = ?
    `, [req.params.id]);

    res.json({ ...orders[0], items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
