# 🛠️ Manual Project Setup Guide

This guide explains how to set up and run the Medicare project manually (without Docker).

## 1. Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL Server** (v8.0 recommended) - [Download](https://dev.mysql.com/downloads/mysql/)
- **Git** - [Download](https://git-scm.com/)

---

## 2. Database Setup

1.  **Start MySQL Server**: Ensure your MySQL service is running.
2.  **Login to MySQL**:
    Open a terminal/command prompt and log in to MySQL:
    ```bash
    mysql -u root -p
    ```
    Enter your MySQL root password when prompted.

3.  **Create Database and Import Schema**:
    Run the following SQL commands to create the database:
    ```sql
    CREATE DATABASE medicare;
    USE medicare;
    ```
    
    Open the schema file located at `backend/src/config/schema.sql`. Copy its content and paste it into your MySQL terminal to create tables and insert sample data.
    
    *Alternatively, you can import it from command line:*
    ```bash
    mysql -u root -p medicare < backend/src/config/schema.sql
    ```

---

## 3. Backend Configuration

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Open the `.env` file in the `backend` folder and update the database credentials to match your local MySQL setup:
    
    ```env
    DB_HOST=localhost
    DB_USER=root             <-- Change to your MySQL username
    DB_PASSWORD=root_password <-- Change to your MySQL password
    DB_NAME=medicare
    PORT=5000
    JWT_SECRET=aron_don
    ```

4.  **Start Backend Server**:
    ```bash
    npm start
    ```
    You should see: `Server running on port 5000` and `MySQL connected successfully`.

---

## 4. Frontend Configuration

1.  Open a **new terminal** window.
2.  Navigate to the project root directory:
    ```bash
    cd medicare-react
    ```

3.  **Install Dependencies**:
    ```bash
    npm install
    ```

4.  **Start Frontend**:
    ```bash
    npm start
    ```
    The application will open automatically at `http://localhost:3000`.

---

## 5. One-Click Start (Windows)

A `start_app.bat` file is provided in the root directory. Double-click it to start both Backend and Frontend servers automatically.

**Note:** Ensure your MySQL server is running before starting the app.

### One-Click Start (With Docker Database)

If you have Docker installed and want to use it for the database while running the app manually:

1.  Make sure Docker Desktop is running.
2.  Double-click `start_app_with_docker.bat` (this will start the MySQL container and then launch the app).

---

## 6. Database Access Information

- **Database Name**: `medicare`
- **User**: `medicare_user`
- **Password**: `medicare_password`
- **Tables**:
    - `users`: Registered users and admins.
    - `medicines`: Product catalog.
    - `orders`: Customer orders.
    - `order_items`: Items within each order.
    - `blood_donors`: Registered blood donors.
    - `blood_requests`: Blood request records.

### Sample SQL Commands

**View all users:**
```sql
SELECT * FROM users;
```

**View all medicines:**
```sql
SELECT * FROM medicines;
```

**Check orders:**
```sql
SELECT * FROM orders;
```
