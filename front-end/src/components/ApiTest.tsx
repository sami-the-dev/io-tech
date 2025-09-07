"use client";

import { useEffect, useState } from "react";

interface ApiTestResult {
  endpoint: string;
  status: "loading" | "success" | "error";
  data?: any;
  error?: string;
}

export default function ApiTest() {
  const [results, setResults] = useState<ApiTestResult[]>([]);

  const endpoints = [
    "/services",
    "/team-members",
    "/testimonials",
    "/legal-services",
    "/navigation-links",
  ];

  const testEndpoint = async (endpoint: string): Promise<ApiTestResult> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api${endpoint}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        return {
          endpoint,
          status: "error",
          error: `${response.status} ${response.statusText}`,
        };
      }

      const data = await response.json();
      return {
        endpoint,
        status: "success",
        data: data.data,
      };
    } catch (error) {
      return {
        endpoint,
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  const runTests = async () => {
    setResults(
      endpoints.map((endpoint) => ({ endpoint, status: "loading" as const }))
    );

    const testPromises = endpoints.map(testEndpoint);
    const testResults = await Promise.all(testPromises);
    setResults(testResults);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Strapi API Connection Test</h2>
      <p className="text-gray-600 mb-4">
        Testing connection to: {process.env.NEXT_PUBLIC_STRAPI_URL}
      </p>

      <button
        onClick={runTests}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Retry Tests
      </button>

      <div className="space-y-3">
        {results.map((result) => (
          <div key={result.endpoint} className="border rounded p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{result.endpoint}</span>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  result.status === "loading"
                    ? "bg-yellow-100 text-yellow-800"
                    : result.status === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {result.status}
              </span>
            </div>

            {result.status === "success" && (
              <div className="mt-2 text-sm text-gray-600">
                ✅ Found {Array.isArray(result.data) ? result.data.length : 0}{" "}
                items
              </div>
            )}

            {result.status === "error" && (
              <div className="mt-2 text-sm text-red-600">❌ {result.error}</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <h3 className="font-medium mb-2">Troubleshooting:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Make sure Strapi is running on port 1337</li>
          <li>Check that content types exist in Strapi admin</li>
          <li>Verify public permissions are enabled for all content types</li>
          <li>Ensure CORS is properly configured</li>
        </ul>
      </div>
    </div>
  );
}
