# 🚀 MediCare - Quick Start Guide

## 30 Second Setup

### Prerequisites
- Node.js installed
- Docker installed
- Git

### 3 Terminal Windows

**Terminal 1: Database**
```bash
cd /home/arun/medicare-react
docker-compose up -d
```

**Terminal 2: Backend**
```bash
cd /home/arun/medicare-react/backend
npm start
# Should show: Server running on port 5000
```

**Terminal 3: Frontend**
```bash
cd /home/arun/medicare-react
npm start
# Should open: http://localhost:3000
```

## 🎯 Test It

1. Open http://localhost:3000 in browser
2. You should see medicines on home page
3. Click "Sign Up" to create account
4. Browse medicines
5. Add to cart
6. Checkout

## 📚 Full Documentation

See `README_SETUP.md` for complete details including:
- Database architecture
- Backend API documentation
- Frontend setup
- Troubleshooting
- Production deployment

## 🐳 Database Access

```bash
# View medicines
docker exec medicare-mysql mysql -u medicare_user -pmedicare_password -e "USE medicare; SELECT * FROM medicines;"

# View users
docker exec medicare-mysql mysql -u medicare_user -pmedicare_password -e "USE medicare; SELECT * FROM users;"

# View orders
docker exec medicare-mysql mysql -u medicare_user -pmedicare_password -e "USE medicare; SELECT * FROM orders;"
```

## 🔌 API Base URL
```
http://localhost:5000/api
```

## ✅ What's Running

| Service | URL | Status |
|---------|-----|--------|
| Frontend | http://localhost:3000 | ✅ React |
| Backend API | http://localhost:5000/api | ✅ Express |
| Database | localhost:3306 | ✅ MySQL 8.0 |

## 🛑 Stop Services

```bash
# Stop frontend (Ctrl+C in that terminal)
# Stop backend (Ctrl+C in that terminal)
# Stop database
docker-compose down
```

---

**For complete documentation, see README_SETUP.md**
