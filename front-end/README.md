# IO-Tech Frontend

A modern Next.js application for IO-Tech law firm website with Strapi CMS integration.

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Runtime**: React 19.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: React Icons
- **CMS**: Strapi v5 integration
- **Build Tool**: Turbopack
- **Linting**: ESLint with Next.js config

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog page
│   ├── services/          # Services page
│   ├── components/        # Page-specific components
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── Navbar.tsx        # Navigation component
│   ├── Footer.tsx        # Footer component
│   ├── HeroSection.tsx   # Hero section
│   ├── ServicesSection.tsx # Services display
│   ├── TeamSection.tsx   # Team members
│   ├── TestimonialsSection.tsx # Client testimonials
│   └── ...
├── lib/                  # Utility libraries
│   └── strapi.ts        # Strapi API utilities
├── hooks/                # Custom React hooks
│   └── useStrapiData.ts # Strapi data fetching hooks
└── types/                # TypeScript type definitions
    └── strapi.ts        # Strapi content types
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ (recommended: Node.js 22)
- pnpm (preferred) or npm
- Running Strapi backend (see ../strapi-backend/README.md)

### Environment Setup

1. **Clone and navigate to frontend directory**:

   ```bash
   cd front-end
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure environment variables**:
   ```env
   # .env.local
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   NEXT_PUBLIC_STRAPI_API_TOKEN=your_api_token_here
   ```

## 🚀 Development

### Available Scripts

```bash
# Start development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint
```

### Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Configuration

### Next.js Configuration (`next.config.js`)

The project includes comprehensive configuration for:

- **CORS Headers**: Configured for Strapi integration
- **Image Optimization**: Support for Strapi uploads
- **Turbopack**: Enhanced build performance
- **TypeScript**: Full type checking support

### Strapi Integration

#### API Utilities (`src/lib/strapi.ts`)

```typescript
// Fetch data from Strapi
const data = await fetchAPI("/services", {
  populate: "*",
});
```

#### Custom Hooks (`src/hooks/useStrapiData.ts`)

```typescript
// Use in components
const { data: services, loading, error } = useServices();
const { data: team } = useTeamMembers();
const { data: testimonials } = useTestimonials();
```

## 📊 Content Types

The frontend integrates with the following Strapi content types:

### Services

- Title, description, icon
- Features array
- Pricing information

### Team Members

- Name, position, bio
- Profile image
- Social links

### Testimonials

- Client name and company
- Testimonial text
- Rating

### Navigation Links

- Label and URL
- Order and visibility

### Legal Services

- Service categories
- Descriptions and pricing

## 🎨 Components

### Core Components

- **Navbar**: Responsive navigation with Strapi-powered menu
- **HeroSection**: Landing page hero with dynamic content
- **ServicesSection**: Service display with Strapi data
- **TeamSection**: Team member grid
- **TestimonialsSection**: Client testimonial carousel
- **Footer**: Site footer with contact information

## 🔄 Data Fetching

### Server Components (Recommended)

```tsx
import { fetchAPI } from "@/lib/strapi";

export default async function ServicesPage() {
  const services = await fetchAPI("/services", {
    populate: "*",
  });

  return <ServicesList services={services} />;
}
```

### Client Components

```tsx
"use client";
import { useServices } from "@/hooks/useStrapiData";

export function ServicesClient() {
  const { data: services, loading, error } = useServices();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <ServicesList services={services} />;
}
```

## 🛡️ Error Handling

- Graceful fallbacks for missing Strapi data
- Loading states for all data fetching
- Error boundaries for component failures
- Network error handling

## 🎯 Performance

- **Turbopack**: Fast development builds
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Server Components**: Reduced client bundle size

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Environment Variables (Production)

```env
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
NEXT_PUBLIC_STRAPI_API_TOKEN=your_production_token
```

## 🔍 Troubleshooting

### Common Issues

1. **Strapi Connection Errors**:
   - Verify Strapi backend is running
   - Check API token configuration
   - Confirm CORS settings

2. **Build Errors**:
   - Clear `.next` directory
   - Reinstall dependencies
   - Check TypeScript errors

3. **CORS Issues**:
   - Verify `next.config.js` headers
   - Check Strapi CORS middleware
   - Confirm environment URLs

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Strapi Documentation](https://docs.strapi.io)
