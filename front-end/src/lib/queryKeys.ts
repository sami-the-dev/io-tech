/**
 * Query Keys for TanStack Query
 *
 * Centralized query key management for better cache invalidation and organization.
 * This follows the recommended pattern from TanStack Query documentation.
 */

export const queryKeys = {
  // Services
  services: ["services"] as const,
  servicesAll: () => [...queryKeys.services, "all"] as const,
  serviceById: (id: string | number) => [...queryKeys.services, id] as const,
  servicesFiltered: (filters: Record<string, any>) =>
    [...queryKeys.services, "filtered", filters] as const,

  // Team Members
  teamMembers: ["teamMembers"] as const,
  teamMembersAll: () => [...queryKeys.teamMembers, "all"] as const,
  teamMemberById: (id: string | number) =>
    [...queryKeys.teamMembers, id] as const,
  teamMembersFiltered: (filters: Record<string, any>) =>
    [...queryKeys.teamMembers, "filtered", filters] as const,

  // Testimonials
  testimonials: ["testimonials"] as const,
  testimonialsAll: () => [...queryKeys.testimonials, "all"] as const,
  testimonialById: (id: string | number) =>
    [...queryKeys.testimonials, id] as const,
  testimonialsFiltered: (filters: Record<string, any>) =>
    [...queryKeys.testimonials, "filtered", filters] as const,

  // Legal Services
  legalServices: ["legalServices"] as const,
  legalServicesAll: () => [...queryKeys.legalServices, "all"] as const,
  legalServiceById: (id: string | number) =>
    [...queryKeys.legalServices, id] as const,
  legalServicesFiltered: (filters: Record<string, any>) =>
    [...queryKeys.legalServices, "filtered", filters] as const,

  // Navigation Links
  navigationLinks: ["navigationLinks"] as const,
  navigationLinksAll: () => [...queryKeys.navigationLinks, "all"] as const,
  navigationLinkById: (id: string | number) =>
    [...queryKeys.navigationLinks, id] as const,

  // Site Settings
  siteSettings: ["siteSettings"] as const,
  siteSettingsAll: () => [...queryKeys.siteSettings, "all"] as const,
} as const;

/**
 * Helper function to invalidate related queries
 * This can be used when mutations occur to refresh related data
 */
export const invalidationPatterns = {
  // Invalidate all services queries
  allServices: () => queryKeys.services,
  // Invalidate all team members queries
  allTeamMembers: () => queryKeys.teamMembers,
  // Invalidate all testimonials queries
  allTestimonials: () => queryKeys.testimonials,
  // Invalidate all legal services queries
  allLegalServices: () => queryKeys.legalServices,
  // Invalidate all navigation links queries
  allNavigationLinks: () => queryKeys.navigationLinks,
  // Invalidate all site settings queries
  allSiteSettings: () => queryKeys.siteSettings,
} as const;
