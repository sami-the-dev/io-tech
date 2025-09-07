"use client";

import React from "react";
import { useScrollToHeader } from "@/hooks/useScrollToHeader";

const Blog = () => {
  // Use custom hook to scroll to header on page navigation
  useScrollToHeader();

  return <div>Blog</div>;
};

export default Blog;
