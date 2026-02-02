#!/bin/bash

# MediCare React Deployment Script

echo "🏥 MediCare React - Deployment Script"
echo "======================================"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application for production..."
npm run build

# Check if build was successful
if [ -d "build" ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are ready in the 'build' directory"
    echo ""
    echo "🚀 Deployment Options:"
    echo "1. Static hosting: Upload 'build' folder to your hosting service"
    echo "2. Local server: npm install -g serve && serve -s build"
    echo "3. Docker: Create Dockerfile with nginx to serve static files"
    echo ""
    echo "🌐 The application will be available at your hosting URL"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

echo "🎉 MediCare React is ready for deployment!"
