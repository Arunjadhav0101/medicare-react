const db = require('../config/database');

async function addUserIdColumn() {
    try {
        console.log('Adding user_id column to blood_requests table...');

        // check if column exists
        const [columns] = await db.query("SHOW COLUMNS FROM blood_requests LIKE 'user_id'");

        if (columns.length === 0) {
            await db.query(`
                ALTER TABLE blood_requests
                ADD COLUMN user_id INT DEFAULT NULL;
            `);
            console.log('user_id column added successfully.');
        } else {
            console.log('user_id column already exists.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error adding column:', error);
        process.exit(1);
    }
}

addUserIdColumn();
