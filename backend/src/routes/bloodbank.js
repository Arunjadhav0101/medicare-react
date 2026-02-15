const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get current blood inventory
router.get('/inventory', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM blood_inventory');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching blood inventory:', error);
        res.status(500).json({ message: 'Server error fetching inventory' });
    }
});

// Register a donor
router.post('/donate', async (req, res) => {
    const { name, email, phone, blood_group, age, weight } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO blood_donors (name, email, phone, blood_group, age, weight) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, phone, blood_group, age, weight]
        );
        res.status(201).json({ message: 'Donor registered successfully', id: result.insertId });
    } catch (error) {
        console.error('Error registering donor:', error);
        res.status(500).json({ message: 'Server error registering donor' });
    }
});

// Request blood
router.post('/request', async (req, res) => {
    const { patient_name, blood_group, units_needed, urgency, hospital_name, contact_phone, user_id } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO blood_requests (patient_name, blood_group, units_needed, urgency, hospital_name, contact_phone, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [patient_name, blood_group, units_needed, urgency, hospital_name, contact_phone, user_id || null]
        );
        res.status(201).json({ message: 'Blood request submitted successfully', id: result.insertId });
    } catch (error) {
        console.error('Error submitting blood request:', error);
        res.status(500).json({ message: 'Server error submitting request' });
    }
});

// Get requests by user ID
router.get('/requests/user/:userId', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM blood_requests WHERE user_id = ? ORDER BY created_at DESC', [req.params.userId]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching user requests:', error);
        res.status(500).json({ message: 'Server error fetching user requests' });
    }
});

// Admin: Get all donors
router.get('/donors', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM blood_donors ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching donors:', error);
        res.status(500).json({ message: 'Server error fetching donors' });
    }
});

// Admin: Get all requests
router.get('/requests', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM blood_requests ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ message: 'Server error fetching requests' });
    }
});

// Admin: Update donor status
router.put('/donors/:id/status', async (req, res) => {
    const { status } = req.body;
    try {
        await db.query('UPDATE blood_donors SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ message: 'Donor status updated successfully' });
    } catch (error) {
        console.error('Error updating donor status:', error);
        res.status(500).json({ message: 'Server error updating donor status' });
    }
});

// Admin: Update request status
router.put('/requests/:id/status', async (req, res) => {
    const { status } = req.body;
    try {
        await db.query('UPDATE blood_requests SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ message: 'Request status updated successfully' });
    } catch (error) {
        console.error('Error updating request status:', error);
        res.status(500).json({ message: 'Server error updating request status' });
    }
});

module.exports = router;
