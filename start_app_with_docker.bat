@echo off
echo Starting Medicare App (Hybrid Mode)...

echo Starting MySQL Container...
docker-compose up -d mysql

echo Waiting for MySQL to initialize...
timeout /t 10

:: Start Backend
start "Medicare Backend" cmd /k "cd backend && npm start"

:: Start Frontend
start "Medicare Frontend" cmd /k "npm start"

echo Servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
