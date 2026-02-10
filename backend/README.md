# Backend API for Medicare Application

## Setup Instructions

### 1. Install MySQL
```bash
# For Ubuntu/Debian
sudo apt-get install mysql-server

# For macOS
brew install mysql

# Start MySQL
sudo systemctl start mysql  # Linux
brew services start mysql  # macOS
```

### 2. Create Database
```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
mysql -u root -p < backend/src/config/schema.sql
```

### 3. Install Dependencies
```bash
cd backend
npm install
```

### 4. Configure Environment
Edit `backend/.env` file:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=medicare
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

### 5. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Database Schema

### Tables:
- **users** - id, name, email, phone, password, role, status
- **medicines** - id, name, price, description, category, stock
- **orders** - id, user_id, total_amount, status
- **order_items** - id, order_id, medicine_id, quantity, price

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Medicines
- `GET /api/medicines` - Get all medicines
- `POST /api/medicines` - Add new medicine
- `PUT /api/medicines/:id` - Update medicine
- `DELETE /api/medicines/:id` - Delete medicine

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status
