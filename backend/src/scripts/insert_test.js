const db = require('../config/database');

async function insertTestRequest() {
    try {
        console.log('Inserting test request for user 13...');
        const [result] = await db.query(
            'INSERT INTO blood_requests (patient_name, blood_group, units_needed, urgency, hospital_name, contact_phone, user_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            ['Test Patient', 'O+', 2, 'high', 'Test Hospital', '1234567890', 13, 'Pending']
        );
        console.log('Inserted ID:', result.insertId);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

insertTestRequest();
