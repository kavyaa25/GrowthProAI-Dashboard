#!/bin/bash

# GrowthProAI Vercel Deployment Script
# This script helps prepare your project for Vercel deployment

echo "🚀 GrowthProAI Vercel Deployment Preparation"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if remote origin is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ Git remote origin not set. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/GrowthProAI.git"
    exit 1
fi

echo "✅ Git repository configured"

# Check if all required files exist
echo "📁 Checking required files..."

required_files=(
    "backend/index.js"
    "backend/package.json"
    "backend/vercel.json"
    "frontend/src/App.jsx"
    "frontend/package.json"
    "frontend/vercel.json"
    "package.json"
    "README.md"
)

missing_files=()

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MISSING"
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -gt 0 ]; then
    echo "⚠️  Missing ${#missing_files[@]} required files. Please create them before deploying."
    exit 1
fi

echo "✅ All required files present"

# Check package.json files
echo "📦 Checking package.json files..."

# Backend package.json
if [ -f "backend/package.json" ]; then
    echo "✅ Backend package.json found"
    if grep -q '"express"' backend/package.json; then
        echo "✅ Express dependency found"
    else
        echo "⚠️  Express dependency missing in backend/package.json"
    fi
else
    echo "❌ Backend package.json missing"
fi

# Frontend package.json
if [ -f "frontend/package.json" ]; then
    echo "✅ Frontend package.json found"
    if grep -q '"react"' frontend/package.json; then
        echo "✅ React dependency found"
    else
        echo "⚠️  React dependency missing in frontend/package.json"
    fi
else
    echo "❌ Frontend package.json missing"
fi

# Check for environment variables
echo "🔧 Checking environment configuration..."

if [ -f "frontend/.env" ]; then
    echo "✅ Frontend .env file found"
    if grep -q "VITE_BACKEND_URL" frontend/.env; then
        echo "✅ VITE_BACKEND_URL configured"
    else
        echo "⚠️  VITE_BACKEND_URL not found in frontend/.env"
    fi
else
    echo "⚠️  Frontend .env file not found (will be set in Vercel)"
fi

# Build test
echo "🔨 Testing builds..."

# Test backend build
echo "Testing backend build..."
cd backend
if npm install --silent; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Backend dependencies installation failed"
    exit 1
fi
cd ..

# Test frontend build
echo "Testing frontend build..."
cd frontend
if npm install --silent; then
    echo "✅ Frontend dependencies installed successfully"
    if npm run build --silent; then
        echo "✅ Frontend build successful"
    else
        echo "❌ Frontend build failed"
        exit 1
    fi
else
    echo "❌ Frontend dependencies installation failed"
    exit 1
fi
cd ..

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for Vercel deployment'"
echo "   git push origin main"
echo ""
echo "2. Deploy Backend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Click 'New Project'"
echo "   - Import your GitHub repository"
echo "   - Set Root Directory to 'backend'"
echo "   - Deploy"
echo ""
echo "3. Deploy Frontend to Vercel:"
echo "   - Create another project in Vercel"
echo "   - Set Root Directory to 'frontend'"
echo "   - Add environment variable: VITE_BACKEND_URL=https://your-backend-url.vercel.app"
echo "   - Deploy"
echo ""
echo "4. Test your deployment:"
echo "   - Visit your frontend URL"
echo "   - Test all functionality"
echo "   - Check PWA features on mobile"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md" 