"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

/**
 * Query Client Provider Component
 *
 * This component provides the TanStack Query context to the entire application.
 * It includes the React Query DevTools for development environment.
 */
export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create a QueryClient instance with default options
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 5 minutes
            staleTime: 1000 * 60 * 5, // 5 minutes
            // Data is cached for 10 minutes before garbage collection
            gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
            // Retry failed requests up to 3 times
            retry: 3,
            // Retry with exponential backoff
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
            // Refetch on window focus in production
            refetchOnWindowFocus: process.env.NODE_ENV === "production",
            // Refetch on reconnect
            refetchOnReconnect: true,
            // Refetch on mount if data is stale
            refetchOnMount: true,
          },
          mutations: {
            // Retry failed mutations once
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Show React Query DevTools only in development */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
