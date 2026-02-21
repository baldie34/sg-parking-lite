export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const place = searchParams.get('place')

  if (!place) {
    return Response.json({ error: 'No place provided' })
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${place}`,
      {
        headers: {
          'User-Agent': 'sg-parking-lite-app'
        }
      }
    )

    if (!res.ok) {
      return Response.json({ error: 'Geocoding failed' })
    }

    const data = await res.json()

    if (!data.length) {
      return Response.json({ error: 'Not found' })
    }

    return Response.json({
      lat: data[0].lat,
      lng: data[0].lon,
    })
  } catch (err) {
    return Response.json({ error: 'Server error' })
  }
}