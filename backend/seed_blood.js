const mysql = require('mysql2/promise');
require('dotenv').config();

const bloodGroupsData = [
    ['A+', 32],
    ['A-', 8],
    ['B+', 28],
    ['B-', 5],
    ['AB+', 15],
    ['AB-', 3],
    ['O+', 45],
    ['O-', 12]
];

(async () => {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME || 'medicare'
        });

        console.log('Connected. Seeding ' + bloodGroupsData.length + ' blood groups...');

        for (const bg of bloodGroupsData) {
            // Check if blood group already exists to avoid duplicates
            const [rows] = await conn.query('SELECT id FROM blood_inventory WHERE blood_group = ?', [bg[0]]);
            if (rows.length === 0) {
                await conn.query(
                    'INSERT INTO blood_inventory (blood_group, units) VALUES (?, ?)',
                    bg
                );
            } else {
                await conn.query(
                    'UPDATE blood_inventory SET units = ? WHERE blood_group = ?',
                    [bg[1], bg[0]]
                );
            }
        }

        console.log('Blood inventory seeded successfully!');
        process.exit(0);
    } catch (e) {
        console.error('Seeding failed:', e);
        process.exit(1);
    }
})();
