"use client";

import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useScrollToHeader } from "@/hooks/useScrollToHeader";
import { useServices } from "@/hooks/useStrapiData";
import { ServiceCard, Pagination } from "@/components";

const Services = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;

  // Fetch services from Strapi
  const { services, loading, error } = useServices();

  // Use custom hook to scroll to header on page navigation
  useScrollToHeader();

  const handleBackClick = () => {
    router.back();
  };

  // Calculate pagination
  const totalPages = Math.ceil(services.length / servicesPerPage);
  const startIndex = (currentPage - 1) * servicesPerPage;
  const currentServices = services.slice(
    startIndex,
    startIndex + servicesPerPage
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--color-primary)]"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-red-600">Error loading services: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-white hover:bg-[var(--color-primary-dark)]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Sidebar - Team Services */}
          <div className="flex-shrink-0 lg:w-64">
            <div className="bg-gray-100 px-1 py-16 text-center">
              <h2 className="mb-4 text-xl font-bold text-[var(--color-primary)]">
                Team <br /> Services
              </h2>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Back Button */}
            <div className="bg-white">
              <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <button
                  onClick={handleBackClick}
                  className="flex items-center gap-2 text-[var(--color-primary)] transition-colors duration-200 hover:text-[var(--color-primary-dark)]"
                >
                  <FiArrowLeft className="h-5 w-5" />
                  <span className="font-medium">Back</span>
                </button>
              </div>
            </div>

            {/* Services Grid */}
            <div className="flex flex-col">
              {currentServices.length > 0 ? (
                currentServices.map(service => (
                  <ServiceCard
                    key={service.id}
                    title={service.title}
                    onReadMore={() => {
                      // Handle service details navigation
                      console.log(`Navigate to ${service.title} details`);
                      // You can navigate to service detail page using service.slug
                      // router.push(`/services/${service.slug}`);
                    }}
                  />
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-gray-600">
                    No services available at the moment.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                onPrevious={prevPage}
                onNext={nextPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
