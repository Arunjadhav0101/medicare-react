# 🐳 Docker Guide for Medicare

This project uses Docker to manage the **MySQL Database**. This ensures you have the correct database version and configuration without needing to install MySQL manually on your system.

## 📋 Prerequisites

- **Docker Desktop** installed and running.
- **Git** (for cloning/downloading the repo).

---

## 🚀 Quick Start Commands

### 1. Start the Database
To start the MySQL container in the background (detached mode):

```bash
docker-compose up -d
```

**What this does:**
- Downloads the `mysql:8.0` image (if not present).
- Creates a container named `medicare-mysql`.
- Maps port `3306` on your machine to the container.
- **Auto-Initializes**: On the very first run, it executes `backend/src/config/schema.sql` to create valid tables and data.
- **Persists Data**: Creates a docker volume `mysql_data` so your data survives restarts.

### 2. View Status
Check if the container is running:

```bash
docker-compose ps
```

You should see `medicare-mysql` with State `Up`.

### 3. Stop the Database
To stop the container but **keep your data**:

```bash
docker-compose stop
```

To stop and **remove** the containers (data is still kept in the volume):

```bash
docker-compose down
```

### 4. Reset Everything (Caution!) ⚠️
To stop containers AND **delete all data** (starting fresh):

```bash
docker-compose down -v
```
*Use this if you messed up the database and want to restart with the clean schema.*

---

## 🔍 Inspecting the Database

You can run SQL commands directly inside the Docker container without installing a GUI tool.

### Access SQL Shell
```bash
docker exec -it medicare-mysql mysql -u medicare_user -pmedicare_password medicare
```
*Note: You are now inside the database shell (`mysql>`).*

### Common SQL Commands
Once inside the shell:

```sql
-- Show all tables
SHOW TABLES;

-- Count users
SELECT COUNT(*) FROM users;

-- View first 5 medicines
SELECT * FROM medicines LIMIT 5;

-- Exit shell
EXIT;
```

---

## 🛠️ Troubleshooting

### "Port already allocated"
If you see an error saying port `3306` is already in use, it means you have another MySQL instance running on your machine (maybe a local installation).
**Solution**: Stop your local MySQL service, or change the port in `docker-compose.yml` (e.g., `"3307:3306"`).

### "Access denied"
Ensure your `backend/.env` file matches the Docker credentials:
```env
DB_HOST=localhost
DB_USER=medicare_user
DB_PASSWORD=medicare_password
DB_NAME=medicare
```

---

## 🏗️ Full Stack Docker (Optional)

Currently, only the database is Dockerized to allow for easier development (Hot Reloading) of the React and Node apps. 

If you want to run the **entire stack** (Frontend + Backend + Database) in Docker (e.g., for production), you would need to:
1. Create `Dockerfile` for Backend.
2. Create `Dockerfile` for Frontend.
3. Update `docker-compose.yml` to include these services.
