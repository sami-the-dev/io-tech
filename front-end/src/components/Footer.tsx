"use client";

import React, { useState } from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import { ImGooglePlus } from "react-icons/im";
import { isValidEmail } from "@/lib/helper";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Handle subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
    setEmailError("");
    // You could show a success message here
  };

  return (
    <footer className="bg-primary-dark text-white">
      {/* Top Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="item-center flex justify-end">
          {/* Email Subscription */}
          <div className="flex-end flex">
            <form
              onSubmit={handleSubscribe}
              className="mr-4 flex flex-col gap-4 sm:flex-row sm:justify-end"
            >
              <div className="relative">
                <button
                  type="submit"
                  className="absolute top-2 right-2 bottom-2 z-10 cursor-pointer rounded-lg bg-[var(--color-primary)] px-4 font-medium text-white transition-colors duration-200 hover:bg-[var(--color-primary-dark)]"
                >
                  Subscribe
                </button>
                <input
                  type="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(""); // Clear error on input
                  }}
                  placeholder="Enter your email address"
                  className={`relative w-full rounded-lg border ${
                    emailError ? "border-red-500" : "border-gray-600"
                  } bg-white py-3 pr-30 pl-4 text-gray-800 placeholder-gray-400 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none`}
                  required
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-400">{emailError}</p>
                )}
              </div>
            </form>
            {/* Right - Contacts and Social Media */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-4">
                <h3 className="text-lg font-semibold">Contacts</h3>
                <div className="flex gap-4">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-3 text-white transition-colors duration-200 hover:bg-[var(--color-primary)] hover:text-white"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-3 text-white transition-colors duration-200 hover:bg-[var(--color-primary)] hover:text-white"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="h-5 w-5" />
                  </a>
                  <a
                    href="https://plus.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-3 text-white transition-colors duration-200 hover:bg-[var(--color-primary)] hover:text-white"
                    aria-label="Google Plus"
                  >
                    <ImGooglePlus className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="border-t border-white"></div>

      {/* Bottom Section */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Left - Navigation Links */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <a
              href="/about"
              className="transition-colors duration-200 hover:text-white"
            >
              About
            </a>
            <a
              href="/strategy"
              className="transition-colors duration-200 hover:text-white"
            >
              Our Strategy
            </a>
            <a
              href="/advantages"
              className="transition-colors duration-200 hover:text-white"
            >
              Our Advantages
            </a>
            <a
              href="/social-responsibility"
              className="transition-colors duration-200 hover:text-white"
            >
              Social Responsibility
            </a>
            <a
              href="/services"
              className="transition-colors duration-200 hover:text-white"
            >
              Our Services
            </a>
          </div>

          {/* Right - Copyright */}
          <div className="text-sm text-gray-400">
            © 2024. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
