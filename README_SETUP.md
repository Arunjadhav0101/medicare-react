# 🏥 MediCare - Online Pharmacy & Blood Bank System

## 📋 Complete Setup & Architecture Guide

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Prerequisites](#prerequisites)
5. [Project Structure](#project-structure)
6. [Database Setup & Connection](#database-setup--connection)
7. [Backend Setup](#backend-setup)
8. [Frontend Setup](#frontend-setup)
9. [How Everything Works Together](#how-everything-works-together)
10. [API Endpoints](#api-endpoints)
11. [Running the Application](#running-the-application)
12. [Troubleshooting](#troubleshooting)
13. [Contributing](#contributing)

---

## Project Overview

**MediCare** is a modern full-stack web application that provides:

### Features:
- 💊 **Online Pharmacy System**
  - Browse and search medicines
  - Add medicines to shopping cart
  - Place orders
  - Track order status
  - Manage user profile

- 🩸 **Blood Bank System**
  - Donor registration
  - Blood request submission
  - Blood inventory management
  - Emergency blood availability check

- 🤖 **AI Chatbot**
  - Healthcare queries assistance
  - Medicine recommendations
  - Blood bank information
  - Real-time chat interface

- 👨‍💼 **Admin Panel**
  - Manage medicines
  - Manage orders
  - Monitor blood inventory
  - User management

---

## Architecture

### System Architecture Diagram:

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER BROWSER                               │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                    HTTP/HTTPS (Port 3000)
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                 FRONTEND (React + TypeScript)                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Components:                                              │  │
│  │  • Navbar, Home, Catalog, Cart, Login, Signup            │  │
│  │  • BloodBank, Orders, UserDashboard, AdminPanel          │  │
│  │  • Chatbot                                                │  │
│  │                                                           │  │
│  │  State Management: React Hooks (useState, useEffect)     │  │
│  │  Routing: React Router DOM v6                            │  │
│  │  Styling: CSS3 with CSS Modules                          │  │
│  └───────────────────────────────────────────────────────────┘  │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                   REST API (Port 5000)
                   JSON over HTTP/HTTPS
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND API (Node.js + Express)                     │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Routes:                                                  │  │
│  │  • /api/users - Authentication & User Management         │  │
│  │  • /api/medicines - Medicine Catalog                     │  │
│  │  • /api/orders - Order Management                        │  │
│  │  • /api/cart - Shopping Cart                             │  │
│  │  • /api/blood-bank - Blood Bank Services                 │  │
│  │  • /api/chatbot - AI Assistant                           │  │
│  │                                                           │  │
│  │  Middleware:                                              │  │
│  │  • CORS (Cross-Origin Resource Sharing)                 │  │
│  │  • JWT Authentication                                    │  │
│  │  • Error Handling                                        │  │
│  └───────────────────────────────────────────────────────────┘  │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                   MySQL Protocol (Port 3306)
                   SQL Queries
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                 DATABASE (MySQL 8.0 - Docker)                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Tables:                                                  │  │
│  │  • users - User accounts & authentication                │  │
│  │  • medicines - Medicine catalog                          │  │
│  │  • orders - Customer orders                              │  │
│  │  • order_items - Items in orders                         │  │
│  │  • blood_donors - Blood donor information                │  │
│  │  • blood_requests - Blood requests                       │  │
│  │                                                           │  │
│  │  Features:                                                │  │
│  │  • Persistent storage (Docker volume)                    │  │
│  │  • Relational data with foreign keys                     │  │
│  │  • Automatic timestamps                                  │  │
│  │  • Sample data pre-loaded                                │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow:

```
1. USER ACTION (e.g., Click "Add to Cart")
        ↓
2. FRONTEND (React handles the event)
        ↓
3. API REQUEST (Axios sends HTTP POST to backend)
        ↓
4. BACKEND (Express receives request, validates data)
        ↓
5. DATABASE QUERY (SQL query executed on MySQL)
        ↓
6. DATABASE RESPONSE (Returns data or confirmation)
        ↓
7. BACKEND RESPONSE (Express sends JSON response)
        ↓
8. FRONTEND UPDATE (React updates UI with new data)
        ↓
9. USER SEES RESULT (Cart shows new item)
```

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.4 | UI library |
| **TypeScript** | 4.9.5 | Type safety |
| **React Router** | 6.30.3 | Client-side routing |
| **Axios** | 1.13.4 | HTTP client |
| **CSS3** | Latest | Styling & animations |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express.js** | 4.18.2 | Web framework |
| **MySQL2** | 3.6.0 | Database driver |
| **JWT** | 9.0.2 | Authentication |
| **bcryptjs** | 2.4.3 | Password hashing |
| **CORS** | 2.8.5 | Cross-origin requests |

### Database
| Technology | Version | Purpose |
|-----------|---------|---------|
| **MySQL** | 8.0 | Relational database |
| **Docker** | 28.2.2 | Container platform |

---

## Prerequisites

Before starting, ensure you have:

### System Requirements
- **OS**: Linux, macOS, or Windows with WSL2
- **RAM**: Minimum 4GB
- **Disk Space**: Minimum 5GB

### Required Software
```bash
# Check if installed
node --version      # Should be v14 or higher
npm --version       # Should be v6 or higher
docker --version    # Should be 20.10 or higher
git --version       # Should be 2.25 or higher
```

### Installation

#### macOS (using Homebrew)
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install required tools
brew install node
brew install docker
brew install git
```

#### Ubuntu/Debian
```bash
# Update package manager
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Git
sudo apt install -y git
```

#### Windows
- Download and install Node.js from https://nodejs.org
- Download and install Docker Desktop from https://www.docker.com/products/docker-desktop
- Download and install Git from https://git-scm.com

---

## Project Structure

```
medicare-react/
│
├── 📂 src/                          (Frontend Source Code)
│   ├── components/
│   │   ├── Navbar.tsx              (Navigation component)
│   │   ├── Chatbot.tsx             (AI chatbot)
│   │   └── *.css                   (Component styles)
│   │
│   ├── pages/
│   │   ├── Home.tsx                (Landing page)
│   │   ├── Catalog.tsx             (Medicine catalog)
│   │   ├── Cart.tsx                (Shopping cart)
│   │   ├── Login.tsx               (User login)
│   │   ├── Signup.tsx              (User registration)
│   │   ├── BloodBank.tsx           (Blood bank services)
│   │   ├── Orders.tsx              (Order tracking)
│   │   ├── UserDashboard.tsx       (User profile)
│   │   ├── AdminPanel.tsx          (Admin management)
│   │   └── *.css                   (Page styles)
│   │
│   ├── services/
│   │   └── api.ts                  (API client configuration)
│   │
│   ├── types/
│   │   └── index.ts                (TypeScript interfaces)
│   │
│   ├── App.tsx                     (Main app component)
│   ├── App.css                     (Global styles)
│   ├── index.tsx                   (Entry point)
│   └── index.css                   (Global CSS)
│
├── 📂 public/                       (Static files)
│   ├── index.html                  (HTML template)
│   ├── favicon.ico
│   └── manifest.json
│
├── 📂 backend/                      (Backend Source Code)
│   ├── src/
│   │   ├── server.js               (Express app initialization)
│   │   │
│   │   ├── config/
│   │   │   ├── database.js         (MySQL connection pool)
│   │   │   └── schema.sql          (Database tables & sample data)
│   │   │
│   │   ├── routes/
│   │   │   ├── users.js            (User endpoints)
│   │   │   ├── medicines.js        (Medicine endpoints)
│   │   │   ├── orders.js           (Order endpoints)
│   │   │   └── cart.js             (Cart endpoints)
│   │   │
│   │   └── middleware/
│   │       └── auth.js             (JWT authentication)
│   │
│   ├── package.json                (Backend dependencies)
│   ├── .env                        (Environment variables)
│   └── node_modules/               (Installed packages)
│
├── 📄 .env                         (Frontend environment variables)
├── 📄 package.json                 (Frontend dependencies)
├── 📄 package-lock.json
├── 📄 tsconfig.json                (TypeScript configuration)
├── 📄 docker-compose.yml           (Docker container config)
├── 📄 .gitignore
└── 📄 README.md

```

---

## Database Setup & Connection

### How Database Connection Works

```
Step 1: Docker starts MySQL container
        ↓
Step 2: Backend reads .env file (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
        ↓
Step 3: Backend initializes connection pool (src/config/database.js)
        ↓
Step 4: When frontend makes API request, backend connects to MySQL
        ↓
Step 5: Backend executes SQL query
        ↓
Step 6: MySQL returns result
        ↓
Step 7: Backend sends result to frontend as JSON
```

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,              -- hashed with bcryptjs
  role ENUM('User', 'Admin') DEFAULT 'User',
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Medicines Table
```sql
CREATE TABLE medicines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Orders Table
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('Pending', 'Processing', 'Completed', 'Delivered') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### Order Items Table
```sql
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  medicine_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE CASCADE
);
```

### Step-by-Step Database Setup

#### Step 1: Start MySQL with Docker

```bash
cd /home/arun/medicare-react

# Start Docker container with MySQL
docker-compose up -d

# Verify it's running
docker ps

# You should see: medicare-mysql running on port 3306
```

**What happens:**
- Docker Compose reads `docker-compose.yml`
- Creates and starts MySQL 8.0 container
- Loads `backend/src/config/schema.sql` automatically
- Creates `medicare` database with all tables
- Inserts 6 sample medicines
- Creates persistent volume `mysql_data` for data storage

#### Step 2: Verify Database Connection

```bash
# Check if MySQL is responding
docker exec medicare-mysql mysql -u medicare_user -pmedicare_password -e "SELECT 1;"

# List all databases
docker exec medicare-mysql mysql -u medicare_user -pmedicare_password -e "SHOW DATABASES;"

# List all tables
docker exec medicare-mysql mysql -u medicare_user -pmedicare_password -e "USE medicare; SHOW TABLES;"

# Check medicines data
docker exec medicare-mysql mysql -u medicare_user -pmedicare_password -e "USE medicare; SELECT * FROM medicines;"
```

#### Step 3: Backend Database Configuration

File: `backend/.env`

```env
# Database Host (where MySQL is running)
DB_HOST=localhost              # Docker container accessible as localhost from host

# Database Credentials (matching docker-compose.yml)
DB_USER=medicare_user          # Database user
DB_PASSWORD=medicare_password  # User password
DB_NAME=medicare               # Database name

# Server Configuration
PORT=5000                      # Backend API port

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

#### Step 4: Backend Connection Code

File: `backend/src/config/database.js`

```javascript
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,           // localhost
  user: process.env.DB_USER,           // medicare_user
  password: process.env.DB_PASSWORD,   // medicare_password
  database: process.env.DB_NAME,       // medicare
  waitForConnections: true,
  connectionLimit: 10,                 // Max 10 concurrent connections
  queueLimit: 0
});

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ MySQL connection error:', err);
  });

module.exports = pool;
```

**What this does:**
- Creates a connection pool (reuses connections, better performance)
- Reads credentials from `.env` file
- Tests connection on startup
- Logs success/error to console
- Makes pool available to routes

---

## Backend Setup

### Step 1: Install Backend Dependencies

```bash
cd /home/arun/medicare-react/backend

npm install

# This installs all packages from package.json
# Creates node_modules/ directory
```

### Step 2: Configure Environment Variables

File: `backend/.env`

```env
DB_HOST=localhost
DB_USER=medicare_user
DB_PASSWORD=medicare_password
DB_NAME=medicare
PORT=5000
JWT_SECRET=super_secret_key_12345_change_in_production
```

### Step 3: Start Backend Server

```bash
npm start

# Expected output:
# Server running on port 5000
# MySQL connected successfully
```

### How Backend Works

#### File: `backend/src/server.js`

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/database');  // Initialize DB connection

const app = express();

// Middleware
app.use(cors());                          // Enable CORS
app.use(express.json());                  // Parse JSON bodies

// Routes
app.use('/api/users', require('./routes/users'));      // User endpoints
app.use('/api/medicines', require('./routes/medicines')); // Medicine endpoints
app.use('/api/orders', require('./routes/orders'));    // Order endpoints

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**What this does:**
1. Initializes Express app
2. Loads environment variables
3. Connects to database
4. Sets up CORS (allows frontend to make requests)
5. Mounts routes
6. Starts listening on port 5000

#### Example Route: `backend/src/routes/medicines.js`

```javascript
const express = require('express');
const pool = require('../config/database');

const router = express.Router();

// GET /api/medicines
router.get('/', async (req, res) => {
  try {
    const [medicines] = await pool.query('SELECT * FROM medicines');
    res.json(medicines);                    // Send medicines as JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/medicines/:id
router.get('/:id', async (req, res) => {
  try {
    const [medicine] = await pool.query('SELECT * FROM medicines WHERE id = ?', [req.params.id]);
    res.json(medicine[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

**How it works:**
1. Frontend makes GET request: `http://localhost:5000/api/medicines`
2. Express matches route `/medicines`
3. Database query: `SELECT * FROM medicines`
4. MySQL returns data
5. Express sends JSON response to frontend
6. Frontend receives and displays medicines

---

## Frontend Setup

### Step 1: Install Frontend Dependencies

```bash
cd /home/arun/medicare-react

npm install

# This installs all packages from package.json
# Creates node_modules/ directory
```

### Step 2: Configure Environment Variables

File: `.env`

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=MediCare
```

**Why these variables?**
- `REACT_APP_API_URL`: Where to send API requests
- `REACT_APP_APP_NAME`: App title used in UI

### Step 3: Start Frontend Development Server

```bash
npm start

# Expected output:
# The app is running at:
#   http://localhost:3000
# Open the link in your browser
```

### How Frontend Works

#### File: `src/services/api.ts`

This file configures Axios to communicate with the backend:

```typescript
import axios from 'axios';

// Create API client with base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to every request if logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Medicine API
export const medicineAPI = {
  getAll: () => api.get('/medicines'),              // GET /api/medicines
  getById: (id) => api.get(`/medicines/${id}`),     // GET /api/medicines/1
  search: (query) => api.get(`/medicines/search?q=${query}`),
  getByCategory: (category) => api.get(`/medicines/category/${category}`),
};

// User API
export const userAPI = {
  login: (email, password) => api.post('/users/login', { email, password }),
  register: (userData) => api.post('/users/register', userData),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (id, userData) => api.put(`/users/${id}`, userData),
};

// Order API
export const orderAPI = {
  getOrders: () => api.get('/orders'),
  createOrder: (orderData) => api.post('/orders', orderData),
  getOrderById: (id) => api.get(`/orders/${id}`),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};
```

#### Example Component: `src/pages/Catalog.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import { medicineAPI } from '../services/api';

const Catalog = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Called when component mounts
    medicineAPI.getAll()
      .then(response => {
        setMedicines(response.data);      // Update state with medicines
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching medicines:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="catalog">
      {medicines.map(medicine => (
        <div key={medicine.id} className="medicine-card">
          <h3>{medicine.name}</h3>
          <p>Price: ₹{medicine.price}</p>
          <p>Stock: {medicine.stock}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
```

**How it works:**
1. Component mounts (`useEffect` runs)
2. Calls `medicineAPI.getAll()` which sends GET request to backend
3. Backend queries MySQL database
4. Backend returns medicines as JSON
5. Frontend receives data and updates state with `setMedicines()`
6. React re-renders component showing medicines
7. User sees medicine list with price and stock

---

## How Everything Works Together

### Complete User Journey: Adding Medicine to Cart

```
1. USER CLICKS "Add to Cart"
   └─ Event: onClick handler triggered
   
2. FRONTEND (React)
   └─ Function: addToCart(medicineId, quantity)
   
3. API REQUEST (Axios)
   └─ POST http://localhost:5000/api/cart/add
   └─ Body: { medicineId: 1, quantity: 2 }
   
4. NETWORK
   └─ HTTP Request sent to backend server
   
5. BACKEND (Express)
   └─ Route: POST /api/cart/add
   └─ Middleware: Parse JSON body
   
6. DATABASE OPERATION
   └─ SQL: INSERT INTO cart_items (user_id, medicine_id, quantity)
   └─ MySQL: Data persisted to disk
   
7. BACKEND RESPONSE
   └─ Sends: { success: true, message: "Added to cart" }
   
8. NETWORK
   └─ JSON response sent back to frontend
   
9. FRONTEND (React)
   └─ Function: response handler
   └─ Updates state: setCartItems([...cartItems, newItem])
   
10. UI UPDATE
    └─ React re-renders
    └─ Cart count increases
    └─ Success message shown
    
11. USER SEES RESULT
    └─ Cart updated with new item
    └─ Can proceed to checkout
```

### Authentication Flow

```
1. USER SUBMITS LOGIN FORM
   Email: user@example.com
   Password: password123
        ↓
2. FRONTEND SENDS REQUEST
   POST /api/users/login
   Body: { email, password }
        ↓
3. BACKEND RECEIVES REQUEST
   Extracts: email, password
        ↓
4. DATABASE LOOKUP
   SELECT * FROM users WHERE email = 'user@example.com'
        ↓
5. PASSWORD VERIFICATION
   Compare hashed password in DB with submitted password
   Using bcryptjs library
        ↓
6. JWT TOKEN GENERATION
   If password matches:
   Create JWT token containing: user_id, email, role
   Token expires in 24 hours
        ↓
7. BACKEND RESPONSE
   Send: { user: {...}, token: "eyJhbGc..." }
        ↓
8. FRONTEND RECEIVES RESPONSE
   Save token in localStorage
   localStorage.setItem('authToken', token)
        ↓
9. SUBSEQUENT REQUESTS
   Token automatically added to every request header:
   Authorization: Bearer eyJhbGc...
        ↓
10. BACKEND VALIDATES TOKEN
    JWT verified on protected routes
    Extracts user_id from token
        ↓
11. USER IS AUTHENTICATED
    Can access protected resources
```

---

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. User Registration
```
POST /users/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}

Response (200 OK):
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "User",
    "status": "Active"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### 2. User Login
```
POST /users/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (200 OK):
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

Error Response (401 Unauthorized):
{
  "error": "Invalid email or password"
}
```

### Medicine Endpoints

#### 3. Get All Medicines
```
GET /medicines

Response (200 OK):
[
  {
    "id": 1,
    "name": "Paracetamol",
    "price": "25.00",
    "description": "Pain relief and fever reducer",
    "category": "Pain Relief",
    "stock": 100,
    "created_at": "2026-02-11T10:32:11.000Z",
    "updated_at": "2026-02-11T10:32:11.000Z"
  },
  ...
]
```

#### 4. Get Medicine by ID
```
GET /medicines/:id

Example: GET /medicines/1

Response (200 OK):
{
  "id": 1,
  "name": "Paracetamol",
  "price": "25.00",
  "description": "Pain relief and fever reducer",
  "category": "Pain Relief",
  "stock": 100
}
```

#### 5. Search Medicines
```
GET /medicines/search?q=paracetamol

Response (200 OK):
[
  {
    "id": 1,
    "name": "Paracetamol",
    ...
  }
]
```

#### 6. Get Medicines by Category
```
GET /medicines/category/:category

Example: GET /medicines/category/Pain%20Relief

Response (200 OK):
[
  {
    "id": 1,
    "name": "Paracetamol",
    "category": "Pain Relief",
    ...
  },
  {
    "id": 5,
    "name": "Aspirin",
    "category": "Pain Relief",
    ...
  }
]
```

### Order Endpoints (Requires Authentication)

#### 7. Get User's Orders
```
GET /orders
Headers: Authorization: Bearer <token>

Response (200 OK):
[
  {
    "id": 1,
    "user_id": 1,
    "total_amount": "150.00",
    "status": "Delivered",
    "created_at": "2026-02-11T10:45:00.000Z",
    "updated_at": "2026-02-11T10:50:00.000Z"
  }
]
```

#### 8. Create New Order
```
POST /orders
Headers: Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "items": [
    {
      "medicineId": 1,
      "quantity": 2,
      "price": "25.00"
    },
    {
      "medicineId": 5,
      "quantity": 1,
      "price": "30.00"
    }
  ],
  "total_amount": "80.00",
  "shipping_address": "123 Main St, City"
}

Response (201 Created):
{
  "id": 1,
  "user_id": 1,
  "total_amount": "80.00",
  "status": "Pending"
}
```

#### 9. Get Order Details
```
GET /orders/:id
Headers: Authorization: Bearer <token>

Response (200 OK):
{
  "id": 1,
  "user_id": 1,
  "total_amount": "80.00",
  "status": "Pending",
  "items": [
    {
      "id": 1,
      "order_id": 1,
      "medicine_id": 1,
      "medicine_name": "Paracetamol",
      "quantity": 2,
      "price": "25.00"
    }
  ]
}
```

#### 10. Update Order Status
```
PUT /orders/:id/status
Headers: Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "status": "Processing"
}

Valid statuses: Pending, Processing, Completed, Delivered

Response (200 OK):
{
  "id": 1,
  "status": "Processing"
}
```

### Cart Endpoints (Requires Authentication)

#### 11. Get Cart
```
GET /cart
Headers: Authorization: Bearer <token>

Response (200 OK):
{
  "items": [
    {
      "medicineId": 1,
      "medicine_name": "Paracetamol",
      "quantity": 2,
      "price": "25.00"
    }
  ],
  "total": "50.00"
}
```

#### 12. Add Item to Cart
```
POST /cart/add
Headers: Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "medicineId": 1,
  "quantity": 2
}

Response (200 OK):
{
  "message": "Item added to cart",
  "cart": {...}
}
```

#### 13. Update Cart Item
```
PUT /cart/update
Headers: Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "medicineId": 1,
  "quantity": 3
}

Response (200 OK):
{
  "message": "Cart updated",
  "cart": {...}
}
```

#### 14. Remove Item from Cart
```
DELETE /cart/remove/:medicineId
Headers: Authorization: Bearer <token>

Response (200 OK):
{
  "message": "Item removed from cart"
}
```

---

## Running the Application

### Complete Startup Guide

#### Terminal 1: Start Database
```bash
cd /home/arun/medicare-react

# Start MySQL Docker container
docker-compose up -d

# Verify it's running
docker ps

# Check database
docker exec medicare-mysql mysql -u medicare_user -pmedicare_password -e "USE medicare; SHOW TABLES;"
```

#### Terminal 2: Start Backend
```bash
cd /home/arun/medicare-react/backend

# Start API server
npm start

# Expected output:
# Server running on port 5000
# MySQL connected successfully
```

#### Terminal 3: Start Frontend
```bash
cd /home/arun/medicare-react

# Start React development server
npm start

# Expected output:
# The app is running at:
#   http://localhost:3000
# Open in your browser
```

### Verify Everything Works

```bash
# Test 1: Check if backend is running
curl http://localhost:5000/api/medicines

# Response should be JSON array of medicines

# Test 2: Open frontend
# Open browser and go to: http://localhost:3000

# Test 3: Check if medicines load
# You should see 6 medicines on the catalog page

# Test 4: Try registering a new user
# Go to Signup page, enter details, submit

# Test 5: Check database for new user
docker exec medicare-mysql mysql -u medicare_user -pmedicare_password -e "USE medicare; SELECT * FROM users;"
```

---

## Troubleshooting

### Issue 1: "Cannot connect to database"

**Error Message:**
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solutions:**
```bash
# Check if Docker is running
docker ps

# If not running, start Docker desktop or daemon
sudo systemctl start docker  # Linux

# Start the MySQL container
cd /home/arun/medicare-react
docker-compose up -d

# Check if container is healthy
docker ps -a

# View container logs
docker logs medicare-mysql

# Verify MySQL is responding
docker exec medicare-mysql mysql -u medicare_user -pmedicare_password -e "SELECT 1;"
```

### Issue 2: "Port 3000 already in use"

**Error Message:**
```
EADDRINUSE: address already in use :::3000
```

**Solutions:**
```bash
# Option 1: Kill process using port 3000
lsof -i :3000
kill -9 <PID>

# Option 2: Use different port
PORT=3001 npm start

# Option 3: Wait for port to be released
sleep 30 && npm start
```

### Issue 3: "Port 5000 already in use"

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**
```bash
# Kill process using port 5000
lsof -i :5000
kill -9 <PID>

# Or change port in backend/.env
# PORT=5001

# Then restart backend
npm start
```

### Issue 4: "Cannot find module 'express'"

**Error Message:**
```
Error: Cannot find module 'express'
```

**Solutions:**
```bash
# Install dependencies
cd /home/arun/medicare-react/backend
npm install

# Clear npm cache if still failing
npm cache clean --force
npm install
```

### Issue 5: "CORS error in browser console"

**Error Message:**
```
Access to XMLHttpRequest at 'http://localhost:5000/api/medicines' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solutions:**
```bash
# Check backend/.env has correct configuration
cat backend/.env

# Verify backend is running with CORS enabled
# Check backend/src/server.js has:
# app.use(cors());

# Restart backend
npm start

# Hard refresh browser (Ctrl+Shift+Delete to clear cache)
```

### Issue 6: "Frontend shows blank page"

**Solutions:**
```bash
# 1. Check browser console (F12 → Console tab)
# Look for red error messages

# 2. Verify frontend .env file
cat .env
# Should show: REACT_APP_API_URL=http://localhost:5000/api

# 3. Check if React dev server is running
# You should see messages in terminal

# 4. Clear browser cache
# Ctrl+Shift+Delete → All time → Clear

# 5. Restart frontend
npm start
```

### Issue 7: "Database keeps disconnecting"

**Solutions:**
```bash
# Check Docker container status
docker ps

# Restart container
docker restart medicare-mysql

# Check container logs for errors
docker logs medicare-mysql

# If data is lost, rebuild container
docker-compose down -v
docker-compose up -d
```

### Issue 8: "Getting 'Invalid token' error after login"

**Solutions:**
```bash
# Clear browser local storage
# DevTools → Application → Local Storage → Delete everything

# Clear cookies
# DevTools → Application → Cookies → Delete all

# Try logging in again

# Check backend logs for JWT error
npm start  # In backend terminal
```

---

## Contributing

### How to Add New Features

#### 1. Database Changes
```bash
# 1. Create new table in backend/src/config/schema.sql
ALTER TABLE medicines ADD COLUMN expiry_date DATE;

# 2. Restart database
docker-compose down
docker-compose up -d

# 3. Verify changes
docker exec medicare-mysql mysql -u medicare_user -pmedicare_password -e "USE medicare; DESC medicines;"
```

#### 2. Backend API Changes
```bash
# 1. Create new route file
# backend/src/routes/newfeature.js

# 2. Add route to server.js
app.use('/api/newfeature', require('./routes/newfeature'));

# 3. Add API function to src/services/api.ts
export const newfeatureAPI = {
  getAll: () => api.get('/newfeature'),
  create: (data) => api.post('/newfeature', data),
};

# 4. Restart backend
npm start
```

#### 3. Frontend Changes
```bash
# 1. Create new component
src/pages/NewFeature.tsx

# 2. Add route to App.tsx
import NewFeature from './pages/NewFeature';
<Route path="/newfeature" element={<NewFeature />} />

# 3. Call API in component
import { newfeatureAPI } from '../services/api';

# 4. Frontend auto-reloads with changes
```

#### 4. Git Workflow
```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes
# 3. Test everything works

# 4. Commit changes
git add .
git commit -m "Add new feature: description"

# 5. Push to GitHub
git push origin feature/new-feature

# 6. Create Pull Request on GitHub
```

---

## Production Deployment

### Before Deploying

1. **Update environment variables**
   ```env
   # backend/.env
   DB_HOST=production-db-server.com
   DB_USER=prod_user
   DB_PASSWORD=very_long_secure_password
   JWT_SECRET=very_long_random_secret_key
   NODE_ENV=production
   ```

2. **Build frontend for production**
   ```bash
   npm run build
   # Creates optimized build in build/ folder
   ```

3. **Test production build locally**
   ```bash
   npm install -g serve
   serve -s build
   ```

4. **Deploy options:**
   - Frontend: Netlify, Vercel, AWS S3 + CloudFront
   - Backend: Heroku, AWS EC2, DigitalOcean
   - Database: AWS RDS, DigitalOcean Managed Database

---

## Summary

### How the System Works:

1. **Database (MySQL)**
   - Stores all data permanently
   - Accessed by backend through SQL queries
   - Docker container ensures consistency

2. **Backend (Express.js)**
   - Receives requests from frontend
   - Queries database
   - Sends responses as JSON

3. **Frontend (React)**
   - User interface
   - Makes API calls to backend
   - Displays data from database

4. **Connection Flow**
   - User action → React component
   - Component calls API
   - Backend processes request
   - Database executes query
   - Result sent back to frontend
   - UI updates with new data

### Key Files:
- **Database**: `backend/src/config/schema.sql`, `backend/src/config/database.js`
- **Backend**: `backend/src/server.js`, `backend/src/routes/*.js`
- **Frontend**: `src/services/api.ts`, `src/pages/*.tsx`, `src/components/*.tsx`
- **Configuration**: `.env`, `backend/.env`, `docker-compose.yml`

### Start Application:
```bash
# Terminal 1: Database
docker-compose up -d

# Terminal 2: Backend
cd backend && npm start

# Terminal 3: Frontend
npm start

# Open: http://localhost:3000
```

---

**© 2024 MediCare - Modern Healthcare Platform**
*Your Complete Guide to Database & Backend Integration*
