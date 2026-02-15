const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
};

console.log('DB Config:', {
    host: dbConfig.host,
    user: dbConfig.user,
    database: dbConfig.database
});

async function initBloodBankDB() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to database.');

        const schema = `
      CREATE TABLE IF NOT EXISTS blood_inventory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        blood_group VARCHAR(5) NOT NULL,
        units INT DEFAULT 0,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_blood_group (blood_group)
      );

      CREATE TABLE IF NOT EXISTS blood_donors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        blood_group VARCHAR(5) NOT NULL,
        age INT,
        weight DECIMAL(5,2),
        status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
        last_donation_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS blood_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        patient_name VARCHAR(255) NOT NULL,
        blood_group VARCHAR(5) NOT NULL,
        units_needed INT NOT NULL,
        urgency ENUM('low', 'medium', 'high') DEFAULT 'medium',
        hospital_name VARCHAR(255) NOT NULL,
        contact_phone VARCHAR(20) NOT NULL,
        status ENUM('Pending', 'Approved', 'Fulfilled', 'Rejected') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Seed data for blood inventory if empty
      INSERT IGNORE INTO blood_inventory (blood_group, units) VALUES
      ('A+', 25), ('A-', 12), ('B+', 18), ('B-', 8),
      ('AB+', 15), ('AB-', 6), ('O+', 30), ('O-', 10);
    `;

        await connection.query(schema);
        console.log('Blood Bank tables created and seeded successfully.');

    } catch (error) {
        console.error('Error initializing Blood Bank database:', error);
    } finally {
        if (connection) await connection.end();
    }
}

initBloodBankDB();
