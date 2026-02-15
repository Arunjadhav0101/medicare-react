const db = require('../config/database');

async function dumpRequests() {
    try {
        const [rows] = await db.query('SELECT * FROM blood_requests');
        console.table(rows);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

dumpRequests();
