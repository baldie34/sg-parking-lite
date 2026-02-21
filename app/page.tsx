'use client'

import { useState } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!query) return

    const res = await fetch(`/api/geocode?place=${encodeURIComponent(query)}`)
    const data = await res.json()

    if (data.error) {
      setResult('Location not found')
    } else {
      setResult(`Lat: ${data.lat}, Lng: ${data.lng}`)
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6">SG Parking Lite</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter destination (e.g. Seletar Mall)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {result && <p className="text-gray-700">{result}</p>}
    </div>
  )
}