"use client";

import React from "react";
import { FiArrowRight } from "react-icons/fi";

export interface ServiceCardProps {
  title: string;
  onReadMore: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, onReadMore }) => {
  return (
    <div className="border-b-color-gray-transparent w-full border-b-1 bg-white p-6 transition-shadow duration-300 hover:shadow-lg">
      <h3 className="font-sm mb-4 text-sm text-[var(--color-primary-dark)]">
        {title}
      </h3>
      <button
        onClick={onReadMore}
        className="font-sm inline-flex items-center gap-2 text-[var(--color-primary)] transition-colors duration-200 hover:text-[var(--color-primary-dark)]"
      >
        <span className="cursor-pointer underline">Read More</span>
      </button>
    </div>
  );
};

export default ServiceCard;
