/**
 * Strapi API Configuration and Utilities
 *
 * This file contains all the necessary functions to interact with the Strapi CMS.
 * Make sure to set your NEXT_PUBLIC_STRAPI_URL environment variable.
 */

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

/**
 * Generic function to fetch data from Strapi API
 */
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${STRAPI_URL}/api${endpoint}`;

  const defaultOptions: RequestInit = {
    method: "GET",
    mode: "cors",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      console.error(
        `Strapi API Error: ${response.status} ${response.statusText}`
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from Strapi API (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Helper function to get media URL from Strapi
 */
export function getStrapiMediaUrl(media: any): string {
  if (!media) return "";

  if (media.data?.attributes?.url) {
    const url = media.data.attributes.url;
    return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
  }

  if (typeof media === "string") {
    return media.startsWith("http") ? media : `${STRAPI_URL}${media}`;
  }

  return "";
}

/**
 * Fetch all services from Strapi
 */
export async function fetchServices() {
  try {
    const data = await fetchAPI("/services?populate=*");
    return data.data || [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

/**
 * Fetch team members from Strapi
 */
export async function fetchTeamMembers() {
  try {
    const data = await fetchAPI("/team-members?populate=*");
    return data.data || [];
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

/**
 * Fetch testimonials from Strapi
 */
export async function fetchTestimonials() {
  try {
    const data = await fetchAPI("/testimonials?populate=*");
    return data.data || [];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

/**
 * Fetch legal services (for about page) from Strapi
 */
export async function fetchLegalServices() {
  try {
    const data = await fetchAPI("/legal-services?populate=deep");
    return data.data || [];
  } catch (error) {
    console.error("Error fetching legal services:", error);
    return [];
  }
}

/**
 * Fetch navigation links from Strapi
 */
export async function fetchNavigationLinks() {
  try {
    const data = await fetchAPI("/navigation-links?populate=*");
    return data.data || [];
  } catch (error) {
    console.error("Error fetching navigation links:", error);
    return [];
  }
}

/**
 * Fetch site settings (general content) from Strapi
 */
export async function fetchSiteSettings() {
  try {
    const data = await fetchAPI("/site-setting?populate=deep");
    return data.data || null;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

/**
 * Transform Strapi service data to component format
 */
export function transformStrapiService(strapiService: any) {
  const attributes = strapiService.attributes;
  return {
    id: strapiService.id,
    title: attributes.title,
    description: attributes.description || "",
    slug: attributes.slug || "",
    createdAt: attributes.createdAt,
    updatedAt: attributes.updatedAt,
  };
}

/**
 * Transform Strapi team member data to component format
 */
export function transformStrapiTeamMember(strapiMember: any) {
  const attributes = strapiMember.attributes;
  return {
    id: strapiMember.id,
    name: attributes.name,
    position: attributes.position,
    description: attributes.description,
    image: getStrapiMediaUrl(attributes.image),
    phone: attributes.phone || "",
    whatsapp: attributes.whatsapp || "",
    email: attributes.email || "",
    experience: attributes.experience || "",
    createdAt: attributes.createdAt,
    updatedAt: attributes.updatedAt,
  };
}

/**
 * Transform Strapi testimonial data to component format
 */
export function transformStrapiTestimonial(strapiTestimonial: any) {
  const attributes = strapiTestimonial.attributes;
  return {
    id: strapiTestimonial.id,
    name: attributes.name,
    company: attributes.company,
    position: attributes.position || "",
    image: getStrapiMediaUrl(attributes.image),
    testimonial: attributes.testimonial,
    rating: attributes.rating || 5,
    createdAt: attributes.createdAt,
    updatedAt: attributes.updatedAt,
  };
}

/**
 * Transform Strapi legal service data to component format
 */
export function transformStrapiLegalService(strapiLegalService: any) {
  const attributes = strapiLegalService.attributes;

  // Transform subtitles if they exist
  const subtitles =
    attributes.subtitles?.map((subtitle: any) => ({
      title: subtitle.title,
      points: subtitle.points || [],
    })) || [];

  return {
    id: strapiLegalService.id,
    title: attributes.title,
    description: attributes.description,
    subtitles: subtitles.length > 0 ? subtitles : undefined,
    createdAt: attributes.createdAt,
    updatedAt: attributes.updatedAt,
  };
}

/**
 * Transform Strapi navigation link data to component format
 */
export function transformStrapiNavigationLink(strapiLink: any) {
  const attributes = strapiLink.attributes;
  return {
    id: strapiLink.id,
    label: attributes.label,
    href: attributes.href,
    isScroll: attributes.isScroll || false,
    scrollTarget: attributes.scrollTarget || "",
    order: attributes.order || 0,
    createdAt: attributes.createdAt,
    updatedAt: attributes.updatedAt,
  };
}

export default {
  fetchServices,
  fetchTeamMembers,
  fetchTestimonials,
  fetchLegalServices,
  fetchNavigationLinks,
  fetchSiteSettings,
  getStrapiMediaUrl,
  transformStrapiService,
  transformStrapiTeamMember,
  transformStrapiTestimonial,
  transformStrapiLegalService,
  transformStrapiNavigationLink,
};
