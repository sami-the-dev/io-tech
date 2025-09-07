"use client";

import avatar from "../../public/avatar.png";
import Navbar from "./Navbar";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import { LawyerProfile } from "@/types/interfaces";

interface HeroProps {
  lawyers?: LawyerProfile[];
  backgroundImage?: string;
}

const Hero = ({
  lawyers = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Corporate Law Specialist",
      description:
        "With over 15 years of experience in corporate law, Sarah has successfully handled complex mergers, acquisitions, and corporate restructuring cases. Her expertise helps businesses navigate legal challenges with confidence.",
      avatar: avatar,
      experience: "15+ Years",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Criminal Defense Attorney",
      description:
        "Michael is a seasoned criminal defense attorney with a proven track record of protecting clients' rights. His strategic approach and courtroom expertise have resulted in numerous successful case outcomes.",
      avatar: avatar,
      experience: "12+ Years",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Family Law Expert",
      description:
        "Emily specializes in family law matters including divorce, child custody, and adoption cases. She provides compassionate legal guidance during life's most challenging transitions.",
      avatar: avatar,
      experience: "10+ Years",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  backgroundImage = "/hero.png",
}: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % lawyers.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + lawyers.length) % lawyers.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentLawyer = lawyers[currentSlide];
  return (
    <section
      className="relative flex h-screen flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <div className="space-between flex flex-row justify-center gap-20">
              <div className="flex flex-col justify-between">
                <button onClick={prevSlide} aria-label="Previous slide">
                  <FiChevronLeft className="h-6 w-6" />
                </button>
                <div className="flex flex-row justify-center space-x-8">
                  {/* Slider Dots */}
                  <div className="flex flex-col gap-3 self-end">
                    {lawyers.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "scale-125 bg-white hover:bg-white/75"
                            : "border-1 border-white bg-transparent"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Lawyer Info */}
              <div className="space-y-10">
                <h2 className="text-2xl font-semibold text-white md:text-3xl">
                  {currentLawyer.name}
                </h2>

                <p className="leading-relaxed text-gray-300">
                  {currentLawyer.description}
                </p>

                {/* Read More Button with Arrow */}
                <button
                  onClick={nextSlide}
                  className="text-primary inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 transition-all duration-300 hover:gap-4"
                >
                  <FiChevronLeft className="h-5 w-5" />
                  Read More
                </button>
              </div>
            </div>

            {/* Right Avatar Section */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative">
                <div className="relative h-80 w-80 overflow-hidden rounded-md bg-white/10 backdrop-blur-sm">
                  <Image
                    src={currentLawyer.avatar}
                    alt={currentLawyer.name}
                    placeholder="blur"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
