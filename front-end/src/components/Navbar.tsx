"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useNavigationLinks } from "@/hooks/useStrapiData";
import { scrollToElement } from "@/lib/helper";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch navigation links from Strapi
  const { navigationLinks, loading, error } = useNavigationLinks();

  // Debug log for development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Navigation Debug:", {
        navigationLinks,
        loading,
        error,
        length: navigationLinks.length,
      });
    }
  }, [navigationLinks, loading, error]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const scrollToSection = (sectionId: string) => {
    scrollToElement(sectionId, 80); // 80px offset for navbar
    setIsMenuOpen(false); // Close mobile menu if open
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Default fallback navigation links if Strapi fails
  const defaultNavLinks = [
    {
      id: 1,
      href: "/",
      label: "Home",
      isScroll: false,
      scrollTarget: "",
      order: 1,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 2,
      href: "/about",
      label: "About",
      isScroll: false,
      scrollTarget: "",
      order: 2,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 3,
      href: "/services",
      label: "Services",
      isScroll: false,
      scrollTarget: "",
      order: 3,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 4,
      href: "#",
      label: "Blog",
      isScroll: false,
      scrollTarget: "",
      order: 4,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 5,
      href: "#",
      label: "Contact Us",
      isScroll: false,
      scrollTarget: "",
      order: 5,
      createdAt: "",
      updatedAt: "",
    },
  ];

  const defaultScrollLinks = [
    {
      id: 6,
      href: "#",
      label: "Our Team",
      isScroll: true,
      scrollTarget: "team-section",
      order: 6,
      createdAt: "",
      updatedAt: "",
    },
  ];

  // Use Strapi data if available, otherwise use defaults
  const navLinks =
    loading || error || navigationLinks.length === 0
      ? defaultNavLinks
      : navigationLinks.filter((link) => !link.isScroll);
  const scrollLinks =
    loading || error || navigationLinks.length === 0
      ? defaultScrollLinks
      : navigationLinks.filter((link) => link.isScroll);

  return (
    <nav className="relative z-50 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Center Navigation Links - Desktop */}
          <div className="hidden flex-1 justify-center md:flex">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:text-gray-300"
                >
                  {link.label}
                </Link>
              ))}
              {scrollLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() =>
                    scrollToSection(
                      link.scrollTarget || link.href.replace("#", "")
                    )
                  }
                  className="rounded-md px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:text-gray-300"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Search and Book Appointment */}
          <div className="hidden items-center space-x-4 md:flex">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={toggleSearch}
                className="rounded-md p-2 text-white transition-colors duration-200 hover:text-gray-300"
                aria-label="Search"
              >
                <FiSearch className="h-5 w-5" />
              </button>

              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-lg border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-gray-800 focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
                      autoFocus
                    />
                    <button className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600">
                      <FiSearch className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Book Appointment Button */}
            <Link
              href="#"
              className="rounded-lg border-1 border-white px-6 py-2 text-sm font-medium text-white transition-colors duration-200"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 focus:text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 border-t border-white/20 bg-black/20 px-2 pt-2 pb-3 backdrop-blur-sm sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-white transition-colors duration-200 hover:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {scrollLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() =>
                    scrollToSection(
                      link.scrollTarget || link.href.replace("#", "")
                    )
                  }
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-white transition-colors duration-200 hover:text-gray-300"
                >
                  {link.label}
                </button>
              ))}

              {/* Mobile Search */}
              <div className="mt-4 px-3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
                />
              </div>

              {/* Mobile Book Appointment */}
              <Link
                href="/book-appointment"
                className="mt-4 block rounded-md bg-[var(--color-primary)] px-3 py-2 text-base font-medium text-white transition-colors duration-200 hover:bg-[var(--color-primary-dark)]"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Loading/Error indicator for development */}
      {(loading || error) && process.env.NODE_ENV === "development" && (
        <div className="absolute top-full left-0 w-full bg-yellow-100 px-4 py-1 text-xs text-yellow-800">
          {loading ? "Loading navigation..." : `Navigation error: ${error}`} -
          Using fallback navigation
        </div>
      )}
    </nav>
  );
};

export default Navbar;
