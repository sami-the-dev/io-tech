"use client";

import React from "react";
import { MdRectangle } from "react-icons/md";

export interface LegalServiceCardProps {
  title: string;
  description: string;
  subtitles?: {
    title: string;
    points: string[];
  }[];
}

const LegalServiceCard: React.FC<LegalServiceCardProps> = ({
  title,
  description,
  subtitles = [],
}) => {
  return (
    <section className="bg-white">
      <h2 className="mb-6 text-left text-lg font-medium text-[var(--color-primary-dark)]">
        {title}
      </h2>
      <div className="border-l-4 border-gray-100 py-8 pl-8 text-gray-700">
        <div className="flex items-start gap-3">
          <MdRectangle className="mt-1 h-2 w-2 flex-shrink-0 text-[var(--color-primary)]" />
          <span className="text-sm leading-relaxed">{description}</span>
        </div>

        {/* Subtitles with bullet points */}
        {subtitles.length > 0 && (
          <div className="mt-6 space-y-4">
            {subtitles.map((subtitle, index) => (
              <div key={index} className="ml-5">
                <h3 className="mb-2 text-sm font-medium text-[var(--color-primary-dark)]">
                  {subtitle.title}
                </h3>
                <ul className="space-y-2">
                  {subtitle.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2">
                      <MdRectangle className="mt-1 h-1.5 w-1.5 flex-shrink-0 text-[var(--color-primary)]" />
                      <span className="text-xs leading-relaxed text-gray-600">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LegalServiceCard;
