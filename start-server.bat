@echo off
REM Quick Start Script for Payment Webhook Server

echo.
echo ====================================
echo Blessing Journey Payment Webhook
echo ====================================
echo.

REM Check if node_modules exists
if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo Failed to install dependencies
    pause
    exit /b 1
  )
  echo.
)

REM Check if .env exists, if not create from example
if not exist .env (
  echo Creating .env file from template...
  copy .env.example .env
  echo.
  echo ⚠️  Please edit .env file with your PayHip API key!
  echo.
  pause
)

echo.
echo 🚀 Starting Payment Webhook Server...
echo.
echo The server will run at: http://localhost:3000
echo.
echo 📝 Webhook endpoint: http://localhost:3000/webhook/payhip
echo 📊 Stats endpoint: http://localhost:3000/api/payment-stats
echo 📋 For setup instructions, see WEBHOOK_SETUP.md
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start
