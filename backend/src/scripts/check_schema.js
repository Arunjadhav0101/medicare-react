const db = require('../config/database');

async function checkSchema() {
    try {
        const [rows] = await db.query('SHOW CREATE TABLE blood_requests');
        console.log(rows[0]['Create Table']);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

checkSchema();
