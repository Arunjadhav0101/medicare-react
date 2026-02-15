@echo off
echo Starting Medicare App...

:: Start Backend
start "Medicare Backend" cmd /k "cd backend && npm start"

:: Start Frontend
start "Medicare Frontend" cmd /k "npm start"

echo Servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
