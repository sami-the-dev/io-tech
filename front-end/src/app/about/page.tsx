"use client";

import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { LegalServiceCard } from "@/components";
import { useLegalServices } from "@/hooks/useStrapiData";
import Image from "next/image";
import aboutBg from "../../../public/about-bg.png";
import { useScrollToHeader } from "@/hooks/useScrollToHeader";

const AboutUs = () => {
  const router = useRouter();

  // Fetch legal services from Strapi
  const { legalServices, loading, error } = useLegalServices();

  const handleBackClick = () => {
    router.back();
  };

  // Use custom hook to scroll to header on page navigation
  useScrollToHeader();

  // Loading state
  if (loading) {
    return (
      <section className="relative min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={aboutBg}
            alt="About background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
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

          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--color-primary)]"></div>
              <p className="mt-4 text-gray-600">Loading legal services...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={aboutBg}
            alt="About background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
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

          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="mb-4 text-red-600">
                Error loading legal services: {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-white hover:bg-[var(--color-primary-dark)]"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={aboutBg}
          alt="About background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
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

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-16">
            <h1 className="text-l mb-20 text-left font-normal text-[var(--color-primary-dark)] md:text-5xl">
              Legal Consultation Services
            </h1>
            <p className="max-w-4xl text-left text-sm leading-relaxed text-gray-600">
              Law Firm is one of the leading legal offices that offer
              exceptional advisory services for both individuals and companies.
              Our mission is to provide comprehensive and specialized legal
              support to meet our clients' needs and offer the best legal
              solutions in various cases and legal fields, we provide our legal
              consultations services as a follow:
            </p>
          </div>

          {/* Legal Services Sections */}
          <div className="space-y-16">
            {legalServices.length > 0 ? (
              legalServices.map(service => (
                <LegalServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  subtitles={service.subtitles}
                />
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-600">
                  No legal services available at the moment.
                </p>
              </div>
            )}
          </div>

          {/* Closing Statement */}
          <div className="mt-16 rounded-lg p-8 text-left">
            <p className="text-sm leading-relaxed text-gray-700">
              At Law Firm, we aim to provide the best legal services to ensure
              your rights and offer effective legal solutions. Contact us today
              to receive professional and comprehensive legal consultation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
