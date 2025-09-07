/**
 * Utility functions for the legal consultation website
 */

// Smooth scroll to element by ID
export const scrollToElement = (elementId: string, offset: number = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};

// Scroll to header section for non-home pages
export const scrollTheHeader = () => {
  window.scrollTo({
    top: window.innerHeight, // 1vh - 1% of viewport height
    behavior: "smooth",
  });
};

// Format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "");

  // Check if it's a US number (10 digits) or international
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  // Return original if format not recognized
  return phone;
};

// Generate WhatsApp URL with message
export const generateWhatsAppUrl = (
  phoneNumber: string,
  message?: string
): string => {
  const cleanPhone = phoneNumber.replace(/\D/g, "");
  const encodedMessage = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ""}`;
};

// Generate mailto URL with subject and body
export const generateMailtoUrl = (
  email: string,
  subject?: string,
  body?: string
): string => {
  const params = new URLSearchParams();
  if (subject) params.append("subject", subject);
  if (body) params.append("body", body);

  const queryString = params.toString();
  return `mailto:${email}${queryString ? `?${queryString}` : ""}`;
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Debounce function for search/input handling
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

// Generate initials from name
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
};

// Calculate reading time for blog posts
export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Format experience years
export const formatExperience = (years: string | number): string => {
  const numYears = typeof years === "string" ? parseInt(years) : years;
  if (numYears === 1) return "1 Year";
  return `${numYears}+ Years`;
};

// Generate random avatar background color
export const generateAvatarColor = (name: string): string => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-teal-500",
  ];

  const charCodeSum = name
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[charCodeSum % colors.length];
};

// Format date for display
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Check if device is mobile
export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
};

// Escape HTML to prevent XSS
export const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return text.replace(/[&<>"']/g, m => map[m]);
};
