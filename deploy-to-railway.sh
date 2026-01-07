#!/bin/bash

# Deploy KJ & Associates CMS API to Railway
# This script will guide you through the deployment process

set -e  # Exit on error

echo "🚀 KJ & Associates CMS - Railway Deployment Script"
echo "=================================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

echo "✅ Railway CLI is installed"
echo ""

# Navigate to server directory
cd server

echo "📦 Step 1: Login to Railway"
echo "----------------------------"
echo "This will open your browser to authenticate with Railway."
echo "If you don't have an account, you can create one for free."
echo ""
read -p "Press Enter to continue..."

railway login

echo ""
echo "✅ Successfully logged in to Railway"
echo ""

echo "📦 Step 2: Initialize Railway Project"
echo "--------------------------------------"
echo "This will create a new Railway project for your API server."
echo ""
read -p "Press Enter to continue..."

railway init

echo ""
echo "✅ Railway project initialized"
echo ""

echo "📦 Step 3: Set Environment Variables"
echo "-------------------------------------"
echo ""
echo "We need to configure your Supabase credentials."
echo "You can find these in your Supabase project settings > API"
echo ""

# Check if .env exists and read values
if [ -f .env ]; then
    echo "Found .env file. Reading configuration..."
    source .env
    
    # Set variables from .env
    railway variables set SUPABASE_URL="$SUPABASE_URL"
    railway variables set SUPABASE_SERVICE_ROLE_KEY="$SUPABASE_SERVICE_ROLE_KEY"
    railway variables set PORT=3001
    railway variables set NODE_ENV=production
    
    # Generate JWT secret
    JWT_SECRET=$(openssl rand -base64 32)
    railway variables set JWT_SECRET="$JWT_SECRET"
    
    # Set CORS origins
    echo ""
    echo "Enter your production domain(s) for CORS (comma-separated):"
    echo "Example: https://kjconsultancy.co.tz,https://www.kjconsultancy.co.tz"
    read -p "ALLOWED_ORIGINS: " ALLOWED_ORIGINS
    
    if [ -n "$ALLOWED_ORIGINS" ]; then
        railway variables set ALLOWED_ORIGINS="$ALLOWED_ORIGINS"
    else
        railway variables set ALLOWED_ORIGINS="*"
        echo "⚠️  Warning: CORS set to allow all origins. Update this in production!"
    fi
    
    echo ""
    echo "✅ Environment variables configured"
else
    echo "❌ .env file not found!"
    echo "Please create a .env file with your Supabase credentials first."
    echo "See .env.example for reference."
    exit 1
fi

echo ""
echo "📦 Step 4: Deploy to Railway"
echo "----------------------------"
echo "This will deploy your API server to Railway."
echo ""
read -p "Press Enter to start deployment..."

railway up

echo ""
echo "✅ Deployment initiated!"
echo ""

echo "📦 Step 5: Get Your API URL"
echo "---------------------------"
echo "Generating a public domain for your API..."
echo ""

# Generate domain
railway domain

echo ""
echo "✅ Domain configured!"
echo ""

echo "🎉 Deployment Complete!"
echo "======================="
echo ""
echo "Your API server is now live on Railway!"
echo ""
echo "Next steps:"
echo "1. Copy the domain URL shown above"
echo "2. Update your frontend configuration (js/config.js or meta tags)"
echo "3. Test your API: curl https://your-domain.railway.app/health"
echo "4. Deploy your frontend to production"
echo ""
echo "📚 For more details, see DEPLOYMENT-GUIDE.md"
echo ""
