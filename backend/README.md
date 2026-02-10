# Backend API for Medicare Application

## Setup Instructions

### 1. Install MongoDB
```bash
# For Ubuntu/Debian
sudo apt-get install mongodb

# For macOS
brew install mongodb-community

# Start MongoDB
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Configure Environment
Edit `backend/.env` file:
```
MONGODB_URI=mongodb://localhost:27017/medicare
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

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

## Frontend Integration

Update `src/services/api.ts` to use these endpoints:
```typescript
const API_URL = 'http://localhost:5000/api';
```
