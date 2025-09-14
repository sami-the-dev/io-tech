"use client";

import React, { useState } from "react";
import { TeamSectionProps } from "@/types/interfaces";
import TeamCard from "./TeamCard";
import Arrow from "./Arrow";
import { useTeamMembers } from "@/hooks/useStrapiQuery";

const TeamSection = ({
  title = "Our Team",
  description = "Meet our dedicated team of legal professionals who bring years of experience and expertise to every case. Our diverse team is committed to providing exceptional legal services and achieving the best outcomes for our clients.",
}: TeamSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage] = useState(3);

  // Fetch team members from Strapi
  const {
    data: teamMembers = [],
    isLoading: loading,
    error,
  } = useTeamMembers();

  const totalSlides =
    teamMembers.length > 0 ? Math.ceil(teamMembers.length / itemsPerPage) : 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getCurrentTeamMembers = () => {
    const startIndex = currentSlide * itemsPerPage;
    return teamMembers.slice(startIndex, startIndex + itemsPerPage);
  };

  // Show loading state only after hydration to prevent mismatch
  const showLoadingState = loading && teamMembers.length === 0;

  // Error state
  if (error) {
    return (
      <section id="team-section" className="relative bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-4 text-red-600">
              Error loading team members: {error?.message || "Unknown error"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-white hover:bg-[var(--color-primary-dark)]"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No team members
  if (teamMembers.length === 0) {
    return (
      <section id="team-section" className="relative bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
              {description}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">
              No team members available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Handle different states without causing hydration mismatch
  if (showLoadingState) {
    return (
      <section id="team-section" className="relative bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
              {description}
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--color-primary)]"></div>
            <p className="mt-4 text-gray-600">Loading team members...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="team-section" className="relative bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
              {description}
            </p>
          </div>
          <div className="text-center">
            <p className="mb-4 text-red-600">
              Error loading team members: {String(error) || "Unknown error"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-white hover:bg-[var(--color-primary-dark)]"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <section id="team-section" className="relative bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
              {description}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">
              No team members available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team-section" className="relative bg-gray-50 py-16">
      {/* Navigation Arrows - Outside Container */}
      {totalSlides > 1 && (
        <>
          <div className="absolute top-1/2 left-4 z-20 -translate-y-1/2">
            <Arrow
              direction="left"
              onClick={prevSlide}
              variant="secondary"
              size="lg"
              className="shadow-xl hover:scale-110 hover:shadow-2xl"
              aria-label="Previous team members"
            />
          </div>

          <div className="absolute top-1/2 right-4 z-20 -translate-y-1/2">
            <Arrow
              direction="right"
              onClick={nextSlide}
              variant="secondary"
              size="lg"
              className="shadow-xl hover:scale-110 hover:shadow-2xl"
              aria-label="Next team members"
            />
          </div>
        </>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
            {description}
          </p>
        </div>

        {/* Team Slider */}
        <div className="relative">
          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {getCurrentTeamMembers().map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Slider Dots */}
        {totalSlides > 1 && (
          <div className="mt-12 flex justify-center gap-3">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "scale-125 bg-[var(--color-primary)]"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
