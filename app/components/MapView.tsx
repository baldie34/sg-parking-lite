"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// Fix default marker icons
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom icons for different carpark types
const createIcon = (type: string) => {
  const colors: Record<string, string> = {
    HDB: "#3b82f6", // blue
    MALL: "#ec4899", // pink
    AIRPORT: "#f59e0b", // amber
    COMMERCIAL: "#8b5cf6", // purple
  };

  const color = colors[type] || "#6b7280"; // gray fallback

  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-weight: bold;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    ">${type[0]}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
    className: "custom-marker",
  });
};

interface Carpark {
  id: string;
  name: string;
  operator_type: string;
  latitude: number;
  longitude: number;
  distance_m: number;
  walking_minutes: number;
  estimated_1h_cost: number;
  lots_available: number | null;
}

interface MapViewProps {
  carparks: Carpark[];
  destinationLat: number;
  destinationLng: number;
}

function MapContent({ carparks, destinationLat, destinationLng }: MapViewProps) {
  const map = useMap();

  useEffect(() => {
    // Always center on destination first
    map.setView([destinationLat, destinationLng], 15);
  }, [destinationLat, destinationLng, map]);

  return (
    <>
      <Marker position={[destinationLat, destinationLng]} icon={defaultIcon}>
        <Popup>
          <div className="text-sm font-semibold">Your Destination</div>
        </Popup>
      </Marker>

      {carparks.map((cp) => (
        <Marker
          key={cp.id}
          position={[cp.latitude, cp.longitude]}
          icon={createIcon(cp.operator_type)}
        >
          <Popup>
            <div className="text-sm">
              <div className="font-bold">{cp.name}</div>
              <div className="text-gray-600 text-xs">{cp.operator_type}</div>
              <div className="mt-2 space-y-1">
                <p>📍 {cp.distance_m}m away ({cp.walking_minutes} min walk)</p>
                <p>💰 ${cp.estimated_1h_cost.toFixed(2)}/hour</p>
                {cp.lots_available !== null && (
                  <p>🅿️ {cp.lots_available} lots available</p>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default function MapView(props: MapViewProps) {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-300 shadow-md">
      <MapContainer
        center={[1.3521, 103.8198]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapContent {...props} />
      </MapContainer>
    </div>
  );
}
