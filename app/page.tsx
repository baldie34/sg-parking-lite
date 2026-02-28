"use client";

import { useState } from "react";
import MapView from "./components/MapView";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [destinationLat, setDestinationLat] = useState(0);
  const [destinationLng, setDestinationLng] = useState(0);

  async function handleSearch() {
    setLoading(true);

    // Step 1: Geocode
    const geoRes = await fetch("/api/geocode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const geoData = await geoRes.json();

    if (!geoData.lat) {
      alert("Location not found");
      setLoading(false);
      return;
    }

    setDestinationLat(geoData.lat);
    setDestinationLng(geoData.lng);

    // Step 2: Search carparks
    const searchRes = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destinationLat: geoData.lat,
        destinationLng: geoData.lng,
      }),
    });

    const searchData = await searchRes.json();
    setResults(searchData);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">SG Parking Lite</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter destination"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {results.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">Map View</h2>
          {destinationLat > 0 && (
            <MapView
              carparks={results}
              destinationLat={destinationLat}
              destinationLng={destinationLng}
            />
          )}
        </div>
      )}

      <div className="space-y-4">
        {results.map((cp, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white">
            <h2 className="font-semibold text-lg text-black">{cp.name}</h2>

            <p className="text-sm text-gray-700">
              {cp.operator_type}
            </p>

            <div className="mt-2 text-gray-900">
              <p>Distance: {cp.distance_m} m ({cp.walking_minutes} min walk)</p>
              <p className="font-medium">
                1 Hour Cost: ${cp.estimated_1h_cost?.toFixed(2)}
              </p>
              {cp.savings_vs_max > 0 && (
                <p className="mt-2 text-blue-600 font-semibold">
                  💰 Save ${cp.savings_vs_max.toFixed(2)} / hr
                </p>
              )}
            </div>

            {cp.lots_available !== null && (
              <p className="mt-2 text-green-600 font-medium">
                Lots Available: {cp.lots_available}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}