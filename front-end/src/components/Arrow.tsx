"use client";

import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface ArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

const Arrow: React.FC<ArrowProps> = ({
  direction,
  onClick,
  size = "md",
  variant = "primary",
  disabled = false,
  className = "",
  "aria-label": ariaLabel,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  // Variant configurations
  const variantClasses = {
    primary:
      "bg-[var(--color-primary)] text-white shadow-md hover:bg-[var(--color-primary-dark)] hover:shadow-lg",
    secondary:
      "bg-gray-100 text-gray-600 shadow-md hover:bg-gray-200 hover:text-[var(--color-primary)]",
    outline:
      "border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary)] hover:text-white",
    ghost: "text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-100",
  };

  // Disabled styles
  const disabledClasses =
    "opacity-50 cursor-not-allowed hover:bg-current hover:shadow-current";

  // Base classes
  const baseClasses =
    "rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2";

  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${disabled ? disabledClasses : variantClasses[variant]}
    ${className}
  `.trim();

  // Icon component
  const IconComponent = direction === "left" ? FiChevronLeft : FiChevronRight;

  // Default aria-label
  const defaultAriaLabel = `${direction === "left" ? "Previous" : "Next"} item`;

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={buttonClasses}
      disabled={disabled}
      aria-label={ariaLabel || defaultAriaLabel}
      type="button"
    >
      <IconComponent className={iconSizes[size]} />
    </button>
  );
};

export default Arrow;
