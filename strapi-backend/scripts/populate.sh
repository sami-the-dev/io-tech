#!/bin/bash

# Simple script to populate Strapi APIs with data

echo "🚀 Populating Strapi APIs with sample data..."

# Check if Strapi is running
if ! curl -s http://localhost:1337/api/services > /dev/null; then
    echo "❌ Strapi is not running on http://localhost:1337"
    echo "Please start Strapi first with: npm run develop"
    exit 1
fi

echo "✅ Strapi is running"

# Check if API token is set
if [ -z "$STRAPI_API_TOKEN" ]; then
    echo "❌ STRAPI_API_TOKEN environment variable is not set"
    echo ""
    echo "To populate data, you need to:"
    echo "1. Start Strapi: npm run develop"
    echo "2. Create admin account at http://localhost:1337/admin"
    echo "3. Go to Settings → API Tokens → Create new token"
    echo "4. Export the token: export STRAPI_API_TOKEN='your-token-here'"
    echo "5. Run this script again"
    exit 1
fi

echo "✅ API token found"

# Run the population script
node scripts/populate-data.js

echo ""
echo "🎉 Data population completed!"
echo ""
echo "You can now:"
echo "- View admin panel: http://localhost:1337/admin"
echo "- Test API endpoints:"
echo "  - http://localhost:1337/api/services"
echo "  - http://localhost:1337/api/team-members"
echo "  - http://localhost:1337/api/testimonials"
echo "  - http://localhost:1337/api/legal-services"
echo "  - http://localhost:1337/api/navigation-links"