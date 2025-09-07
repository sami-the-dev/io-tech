"use client";

import { useState, useEffect } from "react";
import {
  fetchServices,
  fetchTeamMembers,
  fetchTestimonials,
  fetchLegalServices,
  fetchNavigationLinks,
  transformStrapiService,
  transformStrapiTeamMember,
  transformStrapiTestimonial,
  transformStrapiLegalService,
  transformStrapiNavigationLink,
} from "@/lib/strapi";
import {
  StrapiService,
  TeamMember,
  Testimonial,
  StrapiLegalService,
  StrapiNavigationLink,
} from "@/types/interfaces";

/**
 * Custom hook for fetching services data from Strapi
 */
export function useServices() {
  const [services, setServices] = useState<StrapiService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchServices();
      const transformedServices = data.map(transformStrapiService);
      setServices(transformedServices);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch services");
      console.error("Error loading services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  return { services, loading, error, refetch: loadServices };
}

/**
 * Custom hook for fetching team members data from Strapi
 */
export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTeamMembers();
      const transformedMembers = data.map(transformStrapiTeamMember);
      setTeamMembers(transformedMembers);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch team members"
      );
      console.error("Error loading team members:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeamMembers();
  }, []);

  return { teamMembers, loading, error, refetch: loadTeamMembers };
}

/**
 * Custom hook for fetching testimonials data from Strapi
 */
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTestimonials();
      const transformedTestimonials = data.map(transformStrapiTestimonial);
      setTestimonials(transformedTestimonials);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch testimonials"
      );
      console.error("Error loading testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  return { testimonials, loading, error, refetch: loadTestimonials };
}

/**
 * Custom hook for fetching legal services data from Strapi (for About page)
 */
export function useLegalServices() {
  const [legalServices, setLegalServices] = useState<StrapiLegalService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLegalServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLegalServices();
      const transformedServices = data.map(transformStrapiLegalService);
      setLegalServices(transformedServices);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch legal services"
      );
      console.error("Error loading legal services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLegalServices();
  }, []);

  return { legalServices, loading, error, refetch: loadLegalServices };
}

/**
 * Custom hook for fetching navigation links data from Strapi
 */
export function useNavigationLinks() {
  const [navigationLinks, setNavigationLinks] = useState<
    StrapiNavigationLink[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNavigationLinks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNavigationLinks();
      const transformedLinks = data.map(transformStrapiNavigationLink);
      // Sort by order field
      transformedLinks.sort(
        (a: StrapiNavigationLink, b: StrapiNavigationLink) =>
          (a.order || 0) - (b.order || 0)
      );
      setNavigationLinks(transformedLinks);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch navigation links"
      );
      console.error("Error loading navigation links:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNavigationLinks();
  }, []);

  return { navigationLinks, loading, error, refetch: loadNavigationLinks };
}

/**
 * Combined hook for loading all essential site data
 */
export function useSiteData() {
  const services = useServices();
  const teamMembers = useTeamMembers();
  const testimonials = useTestimonials();
  const legalServices = useLegalServices();
  const navigationLinks = useNavigationLinks();

  const loading =
    services.loading ||
    teamMembers.loading ||
    testimonials.loading ||
    legalServices.loading ||
    navigationLinks.loading;

  const errors = [
    services.error,
    teamMembers.error,
    testimonials.error,
    legalServices.error,
    navigationLinks.error,
  ].filter(Boolean);

  return {
    services: services.services,
    teamMembers: teamMembers.teamMembers,
    testimonials: testimonials.testimonials,
    legalServices: legalServices.legalServices,
    navigationLinks: navigationLinks.navigationLinks,
    loading,
    errors,
    refetchAll: () => {
      services.refetch();
      teamMembers.refetch();
      testimonials.refetch();
      legalServices.refetch();
      navigationLinks.refetch();
    },
  };
}
