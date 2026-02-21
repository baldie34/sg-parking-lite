type Carpark = {
  carpark_number: string
  total_lots: string
  lots_available: string
  lat: number
  lng: number
  distance: number
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371e3 // metres
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) *
      Math.cos(φ2) *
      Math.sin(Δλ / 2) *
      Math.sin(Δλ / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = parseFloat(searchParams.get('lat') || '0')
  const lng = parseFloat(searchParams.get('lng') || '0')

  if (!lat || !lng) {
    return Response.json({ error: 'Invalid coordinates' })
  }

  const res = await fetch(
    'https://api.data.gov.sg/v1/transport/carpark-availability'
  )

  const data = await res.json()

  const carparks: Carpark[] = data.items[0].carpark_data.map(
    (cp: any) => {
      const cpLat = parseFloat(cp.carpark_info[0]?.latitude || '0')
      const cpLng = parseFloat(cp.carpark_info[0]?.longitude || '0')

      const distance = calculateDistance(lat, lng, cpLat, cpLng)

      return {
        carpark_number: cp.carpark_number,
        total_lots: cp.carpark_info[0]?.total_lots || '0',
        lots_available: cp.carpark_info[0]?.lots_available || '0',
        lat: cpLat,
        lng: cpLng,
        distance,
      }
    }
  )

  const nearby = carparks
    .filter((cp) => cp.distance < 1000) // within 1km
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5)

  return Response.json(nearby)
}