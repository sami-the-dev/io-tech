"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  fetchServices,
  fetchTeamMembers,
  fetchTestimonials,
  fetchLegalServices,
  fetchNavigationLinks,
  fetchSiteSettings,
} from "@/lib/strapi";
import { queryKeys } from "@/lib/queryKeys";
import {
  StrapiService,
  TeamMember,
  Testimonial,
  StrapiLegalService,
  StrapiNavigationLink,
} from "@/types/interfaces";

/**
 * TanStack Query hooks for Strapi data fetching
 * 
 * These hooks provide optimized data fetching with caching, background updates,
 * and automatic error handling using TanStack Query.
 */

// Base query options that can be extended
type BaseQueryOptions<T> = Omit<
  UseQueryOptions<T, Error, T, readonly string[]>,
  'queryKey' | 'queryFn'
>;

/**
 * Hook for fetching services data with TanStack Query
 */
export function useServices(options?: BaseQueryOptions<StrapiService[]>) {
  return useQuery({
    queryKey: queryKeys.servicesAll(),
    queryFn: fetchServices,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
}

/**
 * Hook for fetching team members data with TanStack Query
 */
export function useTeamMembers(options?: BaseQueryOptions<TeamMember[]>) {
  return useQuery({
    queryKey: queryKeys.teamMembersAll(),
    queryFn: fetchTeamMembers,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
}

/**
 * Hook for fetching testimonials data with TanStack Query
 */
export function useTestimonials(options?: BaseQueryOptions<Testimonial[]>) {
  return useQuery({
    queryKey: queryKeys.testimonialsAll(),
    queryFn: fetchTestimonials,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
}

/**
 * Hook for fetching legal services data with TanStack Query
 */
export function useLegalServices(options?: BaseQueryOptions<StrapiLegalService[]>) {
  return useQuery({
    queryKey: queryKeys.legalServicesAll(),
    queryFn: fetchLegalServices,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
}

/**
 * Hook for fetching navigation links data with TanStack Query
 */
export function useNavigationLinks(options?: BaseQueryOptions<StrapiNavigationLink[]>) {
  return useQuery({
    queryKey: queryKeys.navigationLinksAll(),
    queryFn: fetchNavigationLinks,
    staleTime: 1000 * 60 * 10, // 10 minutes (navigation changes less frequently)
    ...options,
  });
}

/**
 * Hook for fetching site settings data with TanStack Query
 */
export function useSiteSettings(options?: BaseQueryOptions<any>) {
  return useQuery({
    queryKey: queryKeys.siteSettingsAll(),
    queryFn: fetchSiteSettings,
    staleTime: 1000 * 60 * 15, // 15 minutes (settings change rarely)
    ...options,
  });
}

/**
 * Combined hook for loading all essential site data with TanStack Query
 * 
 * This hook runs all queries in parallel and provides aggregated loading states
 */
export function useSiteData() {
  const servicesQuery = useServices();
  const teamMembersQuery = useTeamMembers();
  const testimonialsQuery = useTestimonials();
  const legalServicesQuery = useLegalServices();
  const navigationLinksQuery = useNavigationLinks();
  const siteSettingsQuery = useSiteSettings();

  // Aggregate loading state - true if any query is loading
  const isLoading = 
    servicesQuery.isLoading ||
    teamMembersQuery.isLoading ||
    testimonialsQuery.isLoading ||
    legalServicesQuery.isLoading ||
    navigationLinksQuery.isLoading ||
    siteSettingsQuery.isLoading;

  // Aggregate error state - collect all errors
  const errors = [
    servicesQuery.error,
    teamMembersQuery.error,
    testimonialsQuery.error,
    legalServicesQuery.error,
    navigationLinksQuery.error,
    siteSettingsQuery.error,
  ].filter(Boolean) as Error[];

  // Check if any query is currently fetching (background updates)
  const isFetching = 
    servicesQuery.isFetching ||
    teamMembersQuery.isFetching ||
    testimonialsQuery.isFetching ||
    legalServicesQuery.isFetching ||
    navigationLinksQuery.isFetching ||
    siteSettingsQuery.isFetching;

  // Check if all queries have completed successfully at least once
  const isSuccess = 
    servicesQuery.isSuccess &&
    teamMembersQuery.isSuccess &&
    testimonialsQuery.isSuccess &&
    legalServicesQuery.isSuccess &&
    navigationLinksQuery.isSuccess &&
    siteSettingsQuery.isSuccess;

  return {
    // Data
    services: servicesQuery.data || [],
    teamMembers: teamMembersQuery.data || [],
    testimonials: testimonialsQuery.data || [],
    legalServices: legalServicesQuery.data || [],
    navigationLinks: navigationLinksQuery.data || [],
    siteSettings: siteSettingsQuery.data,
    
    // Loading states
    isLoading,
    isFetching,
    isSuccess,
    
    // Error handling
    errors,
    hasErrors: errors.length > 0,
    
    // Individual query states (for granular control)
    servicesQuery,
    teamMembersQuery,
    testimonialsQuery,
    legalServicesQuery,
    navigationLinksQuery,
    siteSettingsQuery,
    
    // Refetch functions
    refetchAll: () => {
      servicesQuery.refetch();
      teamMembersQuery.refetch();
      testimonialsQuery.refetch();
      legalServicesQuery.refetch();
      navigationLinksQuery.refetch();
      siteSettingsQuery.refetch();
    },
  };
}