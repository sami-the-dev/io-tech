/**
 * Base API configuration
 */
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
  API_PREFIX: "/api",
} as const;

/**
 * Strapi API Routes
 */
export const API_ROUTES = {
  // Content Types
  SERVICES: "/services",
  TEAM_MEMBERS: "/team-members",
  TESTIMONIALS: "/testimonials",
  LEGAL_SERVICES: "/legal-services",
  NAVIGATION_LINKS: "/navigation-links",
  SITE_SETTINGS: "/site-setting",
} as const;

/**
 * Helper function to build full API URL
 */
export function buildApiUrl(endpoint: string, query: string): string {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.API_PREFIX}${endpoint}?${query}`;
}

export default API_ROUTES;
