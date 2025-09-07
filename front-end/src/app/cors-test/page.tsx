"use client";

import { useState } from "react";

export default function CORSTestPage() {
  const [testResult, setTestResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testAPIConnection = async () => {
    setLoading(true);
    setTestResult("Testing API connection...");

    try {
      // Test basic fetch to Strapi
      const response = await fetch("http://localhost:1337/api/services", {
        method: "GET",
        mode: "cors",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTestResult(
          `✅ CORS Success! Received ${data.data?.length || 0} services from Strapi`
        );
      } else {
        setTestResult(
          `❌ API Error: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("CORS Test Error:", error);
      setTestResult(
        `❌ CORS Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  const testWithoutToken = async () => {
    setLoading(true);
    setTestResult("Testing without API token...");

    try {
      const response = await fetch("http://localhost:1337/api/services", {
        method: "GET",
        mode: "cors",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTestResult(
          `✅ Public API Success! Received ${data.data?.length || 0} services`
        );
      } else {
        setTestResult(
          `❌ Public API Error: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      setTestResult(
        `❌ Public API CORS Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">CORS Test Page</h1>

      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-3">API Connection Tests</h2>

          <div className="space-y-3">
            <button
              onClick={testAPIConnection}
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Testing..." : "Test API with Token"}
            </button>

            <button
              onClick={testWithoutToken}
              disabled={loading}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Testing..." : "Test Public API (no token)"}
            </button>
          </div>

          {testResult && (
            <div className="mt-4 p-3 bg-gray-100 rounded border">
              <strong>Result:</strong> {testResult}
            </div>
          )}
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Environment Info</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Strapi URL:</strong>{" "}
              {process.env.NEXT_PUBLIC_STRAPI_URL || "Not set"}
            </p>
            <p>
              <strong>API Token:</strong>{" "}
              {process.env.NEXT_PUBLIC_STRAPI_API_TOKEN ? "Set" : "Not set"}
            </p>
            <p>
              <strong>Node ENV:</strong> {process.env.NODE_ENV}
            </p>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Make sure Strapi backend is running on port 1337</li>
            <li>Make sure the Strapi admin has been created</li>
            <li>Verify API permissions are set for public access</li>
            <li>Test both buttons above to verify CORS is working</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
