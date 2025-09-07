#!/bin/bash

# IO Tech Legal - Strapi Backend Setup Script

echo "🚀 Setting up IO Tech Legal Strapi Backend..."

# Navigate to backend directory
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env ]; then
    echo "📄 Creating environment file..."
    cp .env.example .env
    echo "⚠️  Please update the secrets in .env file before running in production!"
fi

# Start development server
echo "🔥 Starting Strapi development server..."
echo "🌐 Admin panel will be available at: http://localhost:1337/admin"
echo "📊 API will be available at: http://localhost:1337/api"
echo ""
echo "First time setup:"
echo "1. Create an admin user in the admin panel"
echo "2. Go to Settings → API Tokens → Create new token"
echo "3. Copy the token to your frontend .env.local file"
echo "4. Configure public permissions for content types"
echo ""

npm run develop