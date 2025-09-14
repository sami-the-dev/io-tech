import axios, { AxiosRequestConfig } from "axios";
import { API_CONFIG, API_ROUTES, buildApiUrl } from "./apiRoutes";
import type { FetchApi } from "@/types/interfaces";

/**
 * Generic function to fetch data from Strapi API using axios
 */

async function fetchAPI({ endpoint, options, query, token }: FetchApi) {
  const url = buildApiUrl(endpoint, query);

  const defaultOptions: AxiosRequestConfig = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    withCredentials: false,
  };

  try {
    const response = await axios({ ...defaultOptions, ...options });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Strapi API Error: ${error.response?.status} ${error.response?.statusText}`
      );
      throw new Error(
        `HTTP error! status: ${error.response?.status || "Network Error"}`
      );
    }
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
    return url.startsWith("http") ? url : `${API_CONFIG.BASE_URL}${url}`;
  }

  if (typeof media === "string") {
    return media.startsWith("http") ? media : `${API_CONFIG.BASE_URL}${media}`;
  }

  return "";
}

/**
 * Fetch all services from Strapi
 */
export async function fetchServices() {
  try {
    const data = await fetchAPI({
      endpoint: API_ROUTES.SERVICES,
      query: "populate=*",
    });

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
    const data = await fetchAPI({
      endpoint: API_ROUTES.TEAM_MEMBERS,
      query: "populate=*",
    });
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
    const data = await fetchAPI({
      endpoint: API_ROUTES.TESTIMONIALS,
      query: "populate=*",
    });
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
    const data = await fetchAPI({
      endpoint: API_ROUTES.LEGAL_SERVICES,
      query: "populate=*",
    });
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
    const data = await fetchAPI({
      endpoint: API_ROUTES.NAVIGATION_LINKS,
      query: "populate=*",
    });
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
    const data = await fetchAPI({
      endpoint: API_ROUTES.SITE_SETTINGS,
      query: "populate=deep",
    });
    return data.data || null;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

export default {
  fetchServices,
  fetchTeamMembers,
  fetchTestimonials,
  fetchLegalServices,
  fetchNavigationLinks,
  fetchSiteSettings,
  getStrapiMediaUrl,
};
