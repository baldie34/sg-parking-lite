import { privateCarparks } from "@/lib/privateCarparks";
import { calculateDistance } from "@/lib/distance";
import { estimate1HourCost, sortCarparks, HDB_RATE_PER_30MIN, addSavings } from "@/lib/parking";
import { svy21ToLatLng } from "@/lib/svy21";

export async function POST(req: Request) {

  // 🔹 Fetch HDB static dataset (with coordinates)
  const staticRes = await fetch(
    "https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=2000"
  );

  const staticData = await staticRes.json();

  const records = staticData.result.records;

  // Build lookup map
  const carparkMap: Record<string, { lat: number; lng: number }> = {};

  records.forEach((record: any) => {
    if (record.x_coord && record.y_coord) {
      const coords = svy21ToLatLng(
        parseFloat(record.x_coord),
        parseFloat(record.y_coord)
      );
  
      carparkMap[record.car_park_no] = coords;
    }
  });       
 
  console.log("Static dataset records count:", records.length);
  console.log("Static sample record:", records[0]);
  console.log("CarparkMap size:", Object.keys(carparkMap).length);

  const { destinationLat, destinationLng } = await req.json();

  console.log("DESTINATION LAT:", destinationLat);
  console.log("DESTINATION LNG:", destinationLng);

  // 🔹 Fetch HDB availability
  const hdbRes = await fetch(
    "https://api.data.gov.sg/v1/transport/carpark-availability"
  );

  const hdbData = await hdbRes.json();

  const hdbCarparksRaw = hdbData.items[0].carpark_data;

  // 🔹 Convert HDB to unified format (limit to nearby later)
  const hdbCarparks = hdbCarparksRaw.map((cp: any) => {
    const coords = carparkMap[cp.carpark_number];
  
    if (!coords) return null;
  
    const distance = calculateDistance(
      destinationLat,
      destinationLng,
      coords.lat,
      coords.lng
    );
  
    return {
      id: cp.carpark_number,
      name: `HDB ${cp.carpark_number}`,
      operator_type: "HDB",
      latitude: coords.lat,
      longitude: coords.lng,
      lots_available: parseInt(cp.carpark_info[0]?.lots_available || 0),
      rate_per_30min: HDB_RATE_PER_30MIN,
      distance_m: Math.round(distance),
      walking_minutes: Math.round(distance / 80),
      estimated_1h_cost: estimate1HourCost(HDB_RATE_PER_30MIN),
    };
  }).filter(Boolean);

  // 🔹 Convert Private Carparks
  const enrichedPrivate = privateCarparks.map((cp) => {

    if (cp.name.includes("Seletar")) {
      console.log("MALL LAT:", cp.latitude);
      console.log("MALL LNG:", cp.longitude);
    }

    const distance = calculateDistance(
      destinationLat,
      destinationLng,
      cp.latitude,
      cp.longitude
    );

    return {
      ...cp,
      lots_available: null,
      distance_m: Math.round(distance),
      walking_minutes: Math.round(distance / 80),
      estimated_1h_cost: estimate1HourCost(cp.rate_per_30min),
    };
  });

  // 🔹 Merge everything
  const merged = [...hdbCarparks, ...enrichedPrivate];

  const sorted = sortCarparks(merged);

  // 🔹 Filter within 500m
  const within500m = sorted.filter(
    (cp) => cp.distance_m <= 10000000000000000000
  );

  console.log("Merged count:", merged.length);
  console.log("After filter count:", within500m.length);
  
  const withSavings = addSavings(within500m);
  
  return Response.json(withSavings);
}