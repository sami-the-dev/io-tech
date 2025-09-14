"use client";

import React, { useState } from "react";
import avatar from "../../public/avatar.png";
import Image from "next/image";
import { TestimonialsProps } from "@/types/interfaces";
import Arrow from "./Arrow";
import { useTestimonials } from "@/hooks/useStrapiQuery";

const Testimonials = ({
  title = "What Our Clients Are Saying",
  description = "Don't just take our word for it. Here's what our satisfied clients have to say about our legal services and the exceptional results we've achieved together.",
}: TestimonialsProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch testimonials from Strapi
  const {
    data: testimonials = [],
    isLoading: loading,
    error,
  } = useTestimonials();

  // Show loading state only after hydration to prevent mismatch
  const showLoadingState = loading && testimonials.length === 0;

  const nextSlide = () => {
    if (!isAnimating && testimonials.length > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 150);
    }
  };

  const prevSlide = () => {
    if (!isAnimating && testimonials.length > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(
          (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
        setIsAnimating(false);
      }, 150);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Handle different states without causing hydration mismatch
  if (showLoadingState) {
    return (
      <section className="bg-primary-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-left">
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-xl text-gray-300">{description}</p>
          </div>
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-white"></div>
            <p className="mt-4 text-white">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-primary-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-left">
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-xl text-gray-300">{description}</p>
          </div>
          <div className="text-center">
            <p className="mb-4 text-red-400">
              Error loading testimonials: {String(error) || "Unknown error"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-white px-4 py-2 text-gray-900 hover:bg-gray-100"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No testimonials - show section with message
  if (testimonials.length === 0) {
    return (
      <>
        <section className="bg-primary-dark py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-6 text-left">
              <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                {title}
              </h2>
            </div>

            {/* Description */}
            <div className="mb-16 text-left">
              <p className="max-w-3xl text-lg leading-relaxed text-white">
                {description}
              </p>
            </div>

            <div className="text-center">
              <p className="text-white">
                No testimonials available at the moment.
              </p>
            </div>
          </div>
        </section>
        {/* White Gap Section */}
        <div className="bg-white py-4"></div>
      </>
    );
  }

  const currentTestimonial = testimonials[currentSlide];

  return (
    <>
      <section className="bg-primary-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 text-left">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              {title}
            </h2>
          </div>

          {/* Description */}
          <div className="mb-16 text-left">
            <p className="max-w-3xl text-lg leading-relaxed text-white">
              {description}
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="mx-auto max-w-5xl">
            {/* Fixed height container to prevent layout shift */}
            <div className="relative min-h-[500px] overflow-hidden md:min-h-[400px]">
              <div
                className={`flex flex-col items-center transition-all duration-500 ease-in-out md:flex-row ${
                  isAnimating
                    ? "translate-y-4 transform opacity-0"
                    : "translate-y-0 transform opacity-100"
                }`}
              >
                {/* Client Image - Left Side */}
                <div className="relative h-80 w-full flex-shrink-0 md:w-1/3">
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
                    <Image
                      width={300}
                      height={300}
                      src={currentTestimonial.image || avatar}
                      alt={currentTestimonial.name}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyatinyPWkXduzk1Xo9qMD/2Q=="
                      className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                  </div>
                </div>

                {/* Testimonial Content - Right Side */}
                <div className="flex-1 p-8 md:p-12">
                  {/* Testimonial Text */}
                  <blockquote className="mb-8">
                    <p className="text-lg leading-relaxed font-thin text-white transition-all duration-300 md:text-xl">
                      "{currentTestimonial.testimonial}"
                    </p>
                  </blockquote>

                  {/* Client Info */}
                  <div className="mb-8">
                    <h3 className="mb-1 text-xl font-bold text-white transition-all duration-300">
                      {currentTestimonial.name}
                    </h3>
                    <p className="font-medium text-white transition-all duration-300">
                      {currentTestimonial.position &&
                        `${currentTestimonial.position}, `}
                      {currentTestimonial.company}
                    </p>
                  </div>

                  {/* Navigation Arrows - Bottom Right */}
                  {testimonials.length > 1 && (
                    <div className="flex justify-end gap-2">
                      <Arrow
                        direction="left"
                        onClick={prevSlide}
                        variant="primary"
                        size="md"
                        disabled={isAnimating}
                        aria-label="Previous testimonial"
                      />
                      <Arrow
                        direction="right"
                        onClick={nextSlide}
                        variant="primary"
                        size="md"
                        disabled={isAnimating}
                        aria-label="Next testimonial"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White Gap Section */}
      <div className="bg-white py-4"></div>
    </>
  );
};

export default Testimonials;
