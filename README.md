# IO-Tech Law Firm Website

A modern, full-stack web application for IO-Tech law firm featuring a Next.js frontend with Strapi v5 CMS backend for dynamic content management.

## 🏗️ Project Architecture

```
io-tech/
├── front-end/              # Next.js 15 frontend application
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/          # Utility libraries
│   │   ├── hooks/        # Custom React hooks
│   │   └── types/        # TypeScript definitions
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── strapi-backend/        # Strapi v5 CMS backend
│   ├── config/           # Strapi configuration
│   ├── src/
│   │   ├── api/          # Content type APIs
│   │   └── admin/        # Admin customizations
│   ├── scripts/          # Utility scripts
│   └── package.json      # Backend dependencies
└── README.md             # This file
```

## 🚀 Tech Stack

### Frontend

- **Framework**: Next.js 15.5.2 with App Router
- **Runtime**: React 19.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: React Icons
- **Build Tool**: Turbopack

### Backend

- **CMS**: Strapi v5.23.3
- **Runtime**: Node.js 22+
- **Database**: SQLite with better-sqlite3
- **Authentication**: JWT & API Tokens
- **File Storage**: Local filesystem

### Integration

- **API Communication**: RESTful APIs with custom hooks
- **CORS**: Configured for cross-origin requests
- **Environment**: Development and production configurations

## 🚀 Quick Start

### Prerequisites

- Node.js 22+ (required for Strapi v5)
- npm or pnpm package manager
- Git

### 1. Clone Repository

```bash
git clone <repository-url>
cd io-tech
```

### 2. Backend Setup

```bash
# Navigate to backend
cd strapi-backend

# Install dependencies
npm install

# Start Strapi backend
npm run develop
```

**First-time setup**:

1. Visit [http://localhost:1337/admin](http://localhost:1337/admin)
2. Create admin user account
3. Generate API token (Settings → API Tokens)
4. Copy token for frontend configuration

### 3. Frontend Setup

```bash
# Navigate to frontend (new terminal)
cd front-end

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
```

**Configure `.env.local`**:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your_api_token_here
```

```bash
# Start frontend
npm run dev
```

### 4. Access Applications

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Strapi Admin**: [http://localhost:1337/admin](http://localhost:1337/admin)
- **Strapi API**: [http://localhost:1337/api](http://localhost:1337/api)

## 📊 Content Management

### Content Types

The CMS manages the following content types:

| Content Type         | Purpose                     | API Endpoint            |
| -------------------- | --------------------------- | ----------------------- |
| **Services**         | Legal services offered      | `/api/services`         |
| **Team Members**     | Attorney and staff profiles | `/api/team-members`     |
| **Testimonials**     | Client reviews              | `/api/testimonials`     |
| **Legal Services**   | Service categories          | `/api/legal-services`   |
| **Navigation Links** | Website navigation          | `/api/navigation-links` |
| **Components**       | Reusable page components    | `/api/components`       |

### Sample Data

The backend automatically populates sample data on first run:

- 6 legal services (Criminal, Civil, Corporate, etc.)
- 4 team member profiles
- 5 client testimonials
- Navigation menu items
- Homepage components

## 🔧 Development Workflow

### Backend Development

```bash
cd strapi-backend

# Development with auto-reload
npm run develop

# Production build
npm run build

# Production server
npm run start
```

### Frontend Development

```bash
cd front-end

# Development with Turbopack
npm run dev

# Production build
npm run build

# Production server
npm start

# Linting
npm run lint
```

### Full Stack Development

1. **Start Backend**: `cd strapi-backend && npm run develop`
2. **Start Frontend**: `cd front-end && npm run dev`
3. **Access Admin Panel**: Configure content types and data
4. **Test Integration**: Verify frontend displays Strapi content

## 🔑 API Integration

### Authentication

Frontend uses API tokens for Strapi authentication:

```typescript
// Frontend API utility
const response = await fetch(`${STRAPI_URL}/api/services`, {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
});
```

### Custom Hooks

Frontend includes custom hooks for data fetching:

```typescript
// Usage in components
const { data: services, loading, error } = useServices();
const { data: team } = useTeamMembers();
const { data: testimonials } = useTestimonials();
```

### Error Handling

- Graceful fallbacks for missing data
- Loading states for all API calls
- CORS configuration for cross-origin requests
- Comprehensive error logging

## 🛡️ Security Configuration

### CORS Setup

**Backend** (`strapi-backend/config/middlewares.js`):

```javascript
{
  name: 'strapi::cors',
  config: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    headers: ['Content-Type', 'Authorization'],
  },
}
```

**Frontend** (`front-end/next.config.js`):

```javascript
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'Access-Control-Allow-Origin', value: '*' },
      { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE' },
    ],
  }];
}
```

### API Permissions

Configure in Strapi Admin Panel:

1. **Settings → Users & Permissions → Roles**
2. **Public Role**: Enable `find` and `findOne` for all content types
3. **API Tokens**: Create read-only tokens for frontend

## 🚀 Deployment

### Production Environment

#### Backend Deployment

```bash
# Build Strapi
cd strapi-backend
npm run build

# Set production environment variables
NODE_ENV=production
DATABASE_FILENAME=./data.db
# ... other production keys
```

#### Frontend Deployment

```bash
# Build Next.js
cd front-end
npm run build

# Set production environment variables
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
NEXT_PUBLIC_STRAPI_API_TOKEN=production_token
```

### Deployment Platforms

- **Frontend**: Vercel, Netlify, or custom server
- **Backend**: VPS, Docker, Heroku, or DigitalOcean
- **Database**: PostgreSQL or MySQL for production

## 🔍 Troubleshooting

### Common Issues

1. **Connection Errors**:

   - Verify both services are running
   - Check environment variable configuration
   - Confirm CORS settings

2. **API 404 Errors**:

   - Restart Strapi to register content types
   - Verify API endpoints exist
   - Check content type permissions

3. **Build Errors**:
   - Clear build caches (`.next/`, `.strapi/`)
   - Reinstall dependencies
   - Check Node.js version compatibility

### Debug Commands

```bash
# Check running processes
lsof -i :3000  # Frontend
lsof -i :1337  # Backend

# Kill processes if needed
pkill -f "next dev"
pkill -f "strapi develop"

# Clear caches
rm -rf front-end/.next
rm -rf strapi-backend/.strapi
```

## 📚 Documentation

- **Frontend**: [front-end/README.md](./front-end/README.md)
- **Backend**: [strapi-backend/README.md](./strapi-backend/README.md)
- **API Documentation**: Available in Strapi admin panel
- **Component Documentation**: See individual component files

## 🤝 Contributing

1. **Follow Project Structure**: Maintain frontend/backend separation
2. **Environment Configuration**: Use environment variables for all configurations
3. **Type Safety**: Utilize TypeScript for frontend development
4. **API Documentation**: Update documentation for new endpoints
5. **Testing**: Test both frontend and backend integration

## 📄 License

Private project for IO-Tech law firm.

---

## 🔗 Quick Links

- [Frontend Documentation](./front-end/README.md)
- [Backend Documentation](./strapi-backend/README.md)
- [Strapi Admin Panel](http://localhost:1337/admin)
- [Frontend Application](http://localhost:3000)
- [API Documentation](http://localhost:1337/documentation)
