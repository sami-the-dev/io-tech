import { AxiosRequestConfig } from "axios";
import { StaticImageData } from "next/image";

// Base Strapi interface
export interface StrapiBase {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface LawyerProfile extends StrapiBase {
  name: string;
  title: string;
  description: string;
  avatar: string | StaticImageData;
  experience: string;
}

export interface TeamMember extends StrapiBase {
  name: string;
  position: string;
  description: string;
  image: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  experience: string;
}

export interface TeamSectionProps {
  title?: string;
  description?: string;
  teamMembers?: TeamMember[];
}

export interface Testimonial extends StrapiBase {
  name: string;
  company: string;
  position?: string;
  image: string | StaticImageData;
  testimonial: string;
  rating?: number;
}

export interface TestimonialsProps {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
}

export interface ArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

// Strapi-specific interfaces for content types
export interface StrapiService extends StrapiBase {
  title: string;
  description?: string;
  slug?: string;
}

export interface StrapiLegalService extends StrapiBase {
  title: string;
  description: string;
  subtitles?: {
    title: string;
    points: string[];
  }[];
}

export interface StrapiNavigationLink extends StrapiBase {
  label: string;
  href: string;
  isScroll?: boolean;
  scrollTarget?: string;
  order?: number;
}

export interface LegalServiceCardProps {
  title: string;
  description: string;
  subtitles?: {
    title: string;
    points: string[];
  }[];
}

export interface ServiceCardProps {
  title: string;
  onReadMore: () => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export interface FetchApi {
  endpoint: string;
  options?: AxiosRequestConfig;
  token?: string;
  query: string;
}
