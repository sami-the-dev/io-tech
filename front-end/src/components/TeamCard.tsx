"use client";

import React from "react";
import { FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { TeamMember } from "@/types/interfaces";
import {
  formatPhoneNumber,
  generateWhatsAppUrl,
  generateMailtoUrl,
} from "@/lib/helper";

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard = ({ member }: TeamCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden bg-gray-200">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-gray-900">{member.name}</h3>
        <p className="mb-3 font-medium text-[var(--color-primary)]">
          {member.position}
        </p>
      </div>
      {/* Social Links - Always Visible Under Image */}
      <div className="flex justify-center gap-4 border-b border-gray-200 bg-gray-50 py-4">
        {member.phone && (
          <a
            href={`tel:${member.phone}`}
            className="rounded-full bg-white p-3 text-[var(--color-primary)] shadow-md transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white hover:shadow-lg"
            aria-label={`Call ${member.name} at ${formatPhoneNumber(member.phone)}`}
            title={`Call: ${formatPhoneNumber(member.phone)}`}
          >
            <FiPhone className="h-5 w-5" />
          </a>
        )}
        {member.whatsapp && (
          <a
            href={generateWhatsAppUrl(
              member.whatsapp,
              `Hello ${member.name}, I would like to schedule a consultation regarding legal services.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white p-3 text-[var(--color-primary)] shadow-md transition-all duration-300 hover:bg-green-500 hover:text-white hover:shadow-lg"
            aria-label={`WhatsApp ${member.name}`}
            title="WhatsApp for consultation"
          >
            <FaWhatsapp className="h-5 w-5" />
          </a>
        )}
        {member.email && (
          <a
            href={generateMailtoUrl(
              member.email,
              "Legal Consultation Inquiry",
              `Dear ${member.name},\n\nI am interested in scheduling a consultation regarding legal services. Please let me know your availability.\n\nThank you.`
            )}
            className="rounded-full bg-white p-3 text-[var(--color-primary)] shadow-md transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white hover:shadow-lg"
            aria-label={`Email ${member.name}`}
            title={`Email: ${member.email}`}
          >
            <FiMail className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
