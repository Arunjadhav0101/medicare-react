CREATE DATABASE IF NOT EXISTS medicare;
USE medicare;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  role ENUM('User', 'Admin') DEFAULT 'User',
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Medicines table
CREATE TABLE IF NOT EXISTS medicines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('Pending', 'Processing', 'Completed', 'Delivered') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  medicine_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE CASCADE
);

-- Blood Inventory table
CREATE TABLE IF NOT EXISTS blood_inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  blood_group VARCHAR(5) NOT NULL,
  units INT DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_blood_group (blood_group)
);

-- Blood Donors table
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

-- Blood Requests table
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

-- Insert sample medicines
INSERT INTO medicines (name, price, description, category, stock) VALUES
('Paracetamol', 25.00, 'Pain relief and fever reducer', 'Pain Relief', 100),
('Amoxicillin', 120.00, 'Antibiotic for bacterial infections', 'Antibiotics', 50),
('Cetirizine', 45.00, 'Antihistamine for allergies', 'Allergy', 75),
('Omeprazole', 80.00, 'Acid reflux and heartburn relief', 'Digestive', 60),
('Aspirin', 30.00, 'Pain relief and blood thinner', 'Pain Relief', 90),
('Metformin', 150.00, 'Diabetes medication', 'Diabetes', 40);

-- Insert sample users
INSERT INTO users (name, email, password, role, status) VALUES
('John Doe', 'john@example.com', 'hashed_password_123', 'User', 'Active'),
('Jane Smith', 'jane@example.com', 'hashed_password_456', 'User', 'Active'),
('Admin User', 'admin@example.com', 'hashed_admin_password', 'Admin', 'Active'),
('Michael Johnson', 'michael@example.com', 'hashed_password_789', 'User', 'Active'),
('Sarah Williams', 'sarah@example.com', 'hashed_password_321', 'User', 'Active');

-- Insert sample orders
INSERT INTO orders (user_id, total_amount, status) VALUES
(1, 170.00, 'Completed'),
(1, 120.00, 'Pending'),
(2, 95.00, 'Completed'),
(4, 250.00, 'Processing');

-- Insert sample order items
INSERT INTO order_items (order_id, medicine_id, quantity, price) VALUES
(1, 1, 2, 25.00),
(1, 3, 2, 45.00),
(2, 2, 1, 120.00),
(3, 4, 1, 80.00),
(3, 5, 1, 30.00),
(4, 6, 2, 150.00);
