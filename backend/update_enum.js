const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        await conn.query(`ALTER TABLE orders MODIFY status ENUM('Pending', 'Processing', 'Completed', 'Delivered', 'Rejected') DEFAULT 'Pending';`);
        console.log('Enum updated');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
