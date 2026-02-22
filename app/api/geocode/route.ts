export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query + " Singapore"
      )}`
    );

    const data = await response.json();

    if (!data || data.length === 0) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json({
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    });
  } catch (error) {
    console.error("Geocode error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}