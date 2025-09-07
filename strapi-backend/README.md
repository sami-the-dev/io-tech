# IO-Tech Strapi Backend

A headless CMS backend built with Strapi v5 for the IO-Tech law firm website, providing content management and API services.

## 🚀 Tech Stack

- **CMS Framework**: Strapi v5.23.3
- **Runtime**: Node.js 22+
- **Database**: SQLite with better-sqlite3
- **Language**: JavaScript
- **Authentication**: JWT & API Tokens
- **File Storage**: Local filesystem

## 📁 Project Structure

```
├── config/                 # Strapi configuration
│   ├── admin.js           # Admin panel config
│   ├── api.js             # API settings
│   ├── database.js        # Database configuration
│   ├── middlewares.js     # CORS and security
│   ├── plugins.js         # Plugin configurations
│   └── server.js          # Server settings
├── src/
│   ├── admin/             # Admin customizations
│   ├── api/               # Content type APIs
│   │   ├── service/       # Services content type
│   │   ├── team-member/   # Team members
│   │   ├── testimonial/   # Client testimonials
│   │   ├── legal-service/ # Legal service categories
│   │   ├── navigation-link/ # Navigation menu
│   │   └── component/     # Reusable components
│   ├── extensions/        # Core extensions
│   └── index.js          # Entry point
├── scripts/               # Utility scripts
│   ├── populate-data.js   # Data population
│   └── create-admin.js    # Admin user creation
├── public/
│   └── uploads/           # File uploads
├── .tmp/                  # Temporary files
├── data.db               # SQLite database
└── package.json          # Dependencies
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 22+ (required for Strapi v5)
- npm or yarn
- Git

### Environment Setup

1. **Navigate to backend directory**:

   ```bash
   cd strapi-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```env
   # .env
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS=your_app_keys_here
   API_TOKEN_SALT=your_api_token_salt
   ADMIN_JWT_SECRET=your_admin_jwt_secret
   TRANSFER_TOKEN_SALT=your_transfer_token_salt
   JWT_SECRET=your_jwt_secret
   ```

## 🚀 Development

### Available Scripts

```bash
# Start development server
npm run develop

# Build for production
npm run build

# Start production server
npm run start

# Deploy Strapi project
npm run deploy
```

### Development Server

```bash
npm run develop
```

- **Admin Panel**: [http://localhost:1337/admin](http://localhost:1337/admin)
- **API Endpoint**: [http://localhost:1337/api](http://localhost:1337/api)

### First Run Setup

1. **Start the development server**:

   ```bash
   npm run develop
   ```

2. **Create admin user**:

   - Visit [http://localhost:1337/admin](http://localhost:1337/admin)
   - Fill in admin user details
   - Complete the setup wizard

3. **Generate API token**:
   - Go to Settings → API Tokens
   - Create a new token with appropriate permissions
   - Copy the token for frontend configuration

## 📊 Content Types

### Services (`api::service.service`)

```json
{
  "title": "string",
  "description": "text",
  "icon": "string",
  "features": "json"
}
```

**API Endpoints**:

- `GET /api/services` - List all services
- `GET /api/services/:id` - Get specific service
- `POST /api/services` - Create service (authenticated)
- `PUT /api/services/:id` - Update service (authenticated)
- `DELETE /api/services/:id` - Delete service (authenticated)

### Team Members (`api::team-member.team-member`)

```json
{
  "name": "string",
  "position": "string",
  "bio": "text",
  "image": "media",
  "socialLinks": "json"
}
```

### Testimonials (`api::testimonial.testimonial`)

```json
{
  "clientName": "string",
  "company": "string",
  "testimonial": "text",
  "rating": "integer"
}
```

### Legal Services (`api::legal-service.legal-service`)

```json
{
  "title": "string",
  "description": "text",
  "category": "enumeration",
  "pricing": "json"
}
```

### Navigation Links (`api::navigation-link.navigation-link`)

```json
{
  "label": "string",
  "url": "string",
  "order": "integer",
  "isVisible": "boolean"
}
```

### Components (`api::component.component`)

```json
{
  "name": "string",
  "type": "enumeration",
  "content": "json",
  "isActive": "boolean"
}
```

## 🔧 Configuration

### Database Configuration (`config/database.js`)

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: "better-sqlite3",
    connection: {
      filename: env("DATABASE_FILENAME", ".tmp/data.db"),
    },
    useNullAsDefault: true,
  },
});
```

### CORS Configuration (`config/middlewares.js`)

```javascript
module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
```

## 🔑 API Authentication

### API Token Setup

1. **Admin Panel**: Settings → API Tokens
2. **Create Token**:
   - Name: "Frontend Token"
   - Token duration: Unlimited
   - Token type: Read-only or Full access
3. **Copy Token**: Use in frontend `.env.local`

### Usage Examples

```bash
# Get all services
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
  http://localhost:1337/api/services?populate=*

# Get specific service
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
  http://localhost:1337/api/services/1?populate=*
```

## 📝 Data Population

### Automatic Population (Bootstrap)

The backend includes automatic data population on first run with sample data for:

- 6 legal services (Criminal, Civil, Corporate, etc.)
- 4 team members with bios and positions
- 5 client testimonials
- Navigation menu items
- Homepage components

### Manual Population Script

```bash
# Run population script
node scripts/populate-data.js
```

## 🛡️ Security & Permissions

### Content Type Permissions

Configure in Admin Panel → Settings → Roles:

- **Public Role**: Read access to published content
- **Authenticated Role**: CRUD access based on ownership
- **Author Role**: Create and edit own content
- **Editor Role**: Full content management
- **Admin Role**: Full system access

### API Security

- JWT authentication for admin users
- API tokens for frontend integration
- CORS configured for specific origins
- Rate limiting and security headers

## 🔍 API Endpoints

### Base URL: `http://localhost:1337/api`

#### Services

```
GET    /services              # List all services
GET    /services/:id          # Get specific service
POST   /services              # Create service
PUT    /services/:id          # Update service
DELETE /services/:id          # Delete service
```

#### Team Members

```
GET    /team-members          # List all team members
GET    /team-members/:id      # Get specific member
POST   /team-members          # Create member
PUT    /team-members/:id      # Update member
DELETE /team-members/:id      # Delete member
```

#### Testimonials

```
GET    /testimonials          # List all testimonials
GET    /testimonials/:id      # Get specific testimonial
POST   /testimonials          # Create testimonial
PUT    /testimonials/:id      # Update testimonial
DELETE /testimonials/:id      # Delete testimonial
```

### Population Parameters

```bash
# Get all services with relations
GET /api/services?populate=*

# Get paginated results
GET /api/services?pagination[page]=1&pagination[pageSize]=10

# Filter by field
GET /api/services?filters[title][$contains]=criminal

# Sort by field
GET /api/services?sort[0]=title:asc
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables (Production)

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=production_app_keys
API_TOKEN_SALT=production_salt
ADMIN_JWT_SECRET=production_admin_secret
TRANSFER_TOKEN_SALT=production_transfer_salt
JWT_SECRET=production_jwt_secret
DATABASE_FILENAME=./data.db
```

## 🔧 Administration

### Admin Panel Features

- **Content Manager**: CRUD operations for all content types
- **Media Library**: File upload and management
- **User Management**: Admin users and roles
- **API Tokens**: Frontend authentication
- **Settings**: System configuration
- **Plugins**: Extend functionality

### Database Management

```bash
# Export data
npm run strapi export

# Import data
npm run strapi import

# Database migrations
npm run strapi migration:run
```

## 🔍 Troubleshooting

### Common Issues

1. **Port Already in Use**:

   ```bash
   # Kill process on port 1337
   lsof -ti:1337 | xargs kill -9
   ```

2. **Database Errors**:

   ```bash
   # Reset database
   rm .tmp/data.db
   npm run develop
   ```

3. **CORS Issues**:

   - Check `config/middlewares.js`
   - Verify frontend URL in CORS origins
   - Ensure API token is correctly configured

4. **Node Version Issues**:
   ```bash
   # Check Node version (should be 22+)
   node --version
   ```

### Debug Mode

```bash
# Enable debug logging
DEBUG=strapi:* npm run develop
```

## 🔗 Frontend Integration

This backend is designed to work with the Next.js frontend. The frontend includes:

- API utilities in `/src/lib/strapi.ts`
- Custom hooks in `/src/hooks/useStrapiData.ts`
- TypeScript interfaces in `/src/types/strapi.ts`

### Connection Setup

1. Set the Strapi URL in your frontend `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your-api-token
```

2. The frontend is configured to automatically connect to these endpoints

## 📚 Additional Resources

- [Strapi v5 Documentation](https://docs.strapi.io/dev-docs/intro)
- [Strapi v5 API Reference](https://docs.strapi.io/dev-docs/api/rest)
- [Content Types Guide](https://docs.strapi.io/dev-docs/backend-customization/models)
- [Plugin Development](https://docs.strapi.io/dev-docs/plugins-development)

## 🤝 Contributing

1. Follow Strapi v5 conventions
2. Document new content types
3. Update API documentation
4. Test with frontend integration
5. Follow security best practices

## 📄 License

Private project for IO-Tech law firm.
