// list of private/commercial carparks that isn't covered by the
// HDB dataset.  The app will calculate distance & cost for each entry and
// include them in the search results.  You can either maintain this array
// manually or, for larger datasets, load from a JSON file or external API.
//
// For reference, each record has the following shape:
// {
//   id: string;
//   name: string;
//   latitude: number;
//   longitude: number;
//   rate_per_30min: number;
//   operator_type: string; // e.g. "MALL", "AIRPORT", etc.
// }
//
// To include *all* private carparks in Singapore, replace the placeholder
// below with your full dataset.  A convenient source is the LTA or URA
// parking API, or a manually assembled JSON exported from a spreadsheet.

// Example static export with just one entry – Seletar Mall – so that the
// module is valid and the search endpoint continues to work.  Add more
// entries as needed.
export const privateCarparks = [
  {
    id: "seletar_mall",
    name: "The Seletar Mall Carpark",
    latitude: 1.3917231,
    longitude: 103.8760293,
    rate_per_30min: 1.20,
    operator_type: "MALL",
  },
  {
    id: "changi_airport_t1",
    name: "Changi Airport Terminal 1 Carpark",
    latitude: 1.3644,
    longitude: 103.9915,
    rate_per_30min: 2.00,
    operator_type: "AIRPORT",
  },
  {
    id: "changi_airport_t2",
    name: "Changi Airport Terminal 2 Carpark",
    latitude: 1.3582,
    longitude: 103.9891,
    rate_per_30min: 2.00,
    operator_type: "AIRPORT",
  },
  {
    id: "changi_airport_t3",
    name: "Changi Airport Terminal 3 Carpark",
    latitude: 1.3535,
    longitude: 103.9884,
    rate_per_30min: 2.00,
    operator_type: "AIRPORT",
  },
  {
    id: "changi_airport_t4",
    name: "Changi Airport Terminal 4 Carpark",
    latitude: 1.3450,
    longitude: 103.9784,
    rate_per_30min: 2.00,
    operator_type: "AIRPORT",
  },
  {
    id: "orchard_central",
    name: "Orchard Central Carpark",
    latitude: 1.3034,
    longitude: 103.8345,
    rate_per_30min: 2.50,
    operator_type: "MALL",
  },
  {
    id: "paragon",
    name: "Paragon Carpark",
    latitude: 1.3037371,
    longitude: 103.8355203,
    rate_per_30min: 2.50,
    operator_type: "MALL",
  },
  {
    id: "orchard_gateway",
    name: "Orchard Gateway Carpark",
    latitude: 1.3037371,
    longitude: 103.8355203,
    rate_per_30min: 2.50,
    operator_type: "MALL",
  },
  {
    id: "far_east_plaza",
    name: "Far East Plaza Carpark",
    latitude: 1.3035,
    longitude: 103.8314,
    rate_per_30min: 2.00,
    operator_type: "MALL",
  },
  {
    id: "pavilion",
    name: "Pavilion Carpark",
    latitude: 1.2975,
    longitude: 103.8399,
    rate_per_30min: 2.50,
    operator_type: "MALL",
  },
  {
    id: "ib_plaza",
    name: "I.B. Plaza Carpark",
    latitude: 1.3045,
    longitude: 103.8325,
    rate_per_30min: 2.50,
    operator_type: "MALL",
  },
  {
    id: "plaza_singapura",
    name: "Plaza Singapura Carpark",
    latitude: 1.2956,
    longitude: 103.8496,
    rate_per_30min: 2.50,
    operator_type: "MALL",
  },
  {
    id: "takashimaya",
    name: "Takashimaya Carpark",
    latitude: 1.3025211,
    longitude: 103.8353202,
    rate_per_30min: 2.50,
    operator_type: "MALL",
  },
  {
    id: "wisma_atria",
    name: "Wisma Atria Carpark",
    latitude: 1.3036967,
    longitude: 103.8332876,
    rate_per_30min: 2.50,
    operator_type: "MALL",
  },
  {
    id: "ngee_ann_city",
    name: "Ngee Ann City Carpark",
    latitude: 1.3026170,
    longitude: 103.8345284,
    rate_per_30min: 2.50,
    operator_type: "MALL",
  },
  {
    id: "vivocity",
    name: "VivoCity Carpark",
    latitude: 1.2643707,
    longitude: 103.8229537,
    rate_per_30min: 1.50,
    operator_type: "MALL",
  },
  {
    id: "harbourfront_centre",
    name: "HarbourFront Centre Carpark",
    latitude: 1.2646,
    longitude: 103.8224,
    rate_per_30min: 1.50,
    operator_type: "MALL",
  },
  {
    id: "nex",
    name: "NEX Carpark",
    latitude: 1.3505193,
    longitude: 103.8722533,
    rate_per_30min: 1.00,
    operator_type: "MALL",
  },
  {
    id: "serangoon_plaza",
    name: "Serangoon Plaza Carpark",
    latitude: 1.3522,
    longitude: 103.8663,
    rate_per_30min: 1.20,
    operator_type: "MALL",
  },
  {
    id: "heartland_mall",
    name: "Heartland Mall Carpark",
    latitude: 1.3509,
    longitude: 103.8658,
    rate_per_30min: 1.00,
    operator_type: "MALL",
  },
  {
    id: "eunos_plaza",
    name: "Eunos Plaza Carpark",
    latitude: 1.3251,
    longitude: 103.8947,
    rate_per_30min: 0.80,
    operator_type: "MALL",
  },
  {
    id: "jcube",
    name: "JCube Carpark",
    latitude: 1.3333005,
    longitude: 103.7401970,
    rate_per_30min: 1.20,
    operator_type: "MALL",
  },
  {
    id: "west_mall",
    name: "West Mall Carpark",
    latitude: 1.3374,
    longitude: 103.7498,
    rate_per_30min: 1.00,
    operator_type: "MALL",
  },
  {
    id: "clementi_mall",
    name: "Clementi Mall Carpark",
    latitude: 1.3300,
    longitude: 103.7618,
    rate_per_30min: 1.00,
    operator_type: "MALL",
  },
  {
    id: "peninsula_plaza",
    name: "Peninsula Plaza Carpark",
    latitude: 1.2945,
    longitude: 103.8547,
    rate_per_30min: 2.00,
    operator_type: "MALL",
  },
  {
    id: "tan_quee_lan",
    name: "Tan Quee Lan Square Carpark",
    latitude: 1.2965,
    longitude: 103.8500,
    rate_per_30min: 2.00,
    operator_type: "MALL",
  },
  {
    id: "geylang_lorong9",
    name: "Geylang Lorong 9 Carpark",
    latitude: 1.3085,
    longitude: 103.8639,
    rate_per_30min: 0.80,
    operator_type: "COMMERCIAL",
  },
  {
    id: "bedok_mall",
    name: "Bedok Mall Carpark",
    latitude: 1.3248627,
    longitude: 103.9292277,
    rate_per_30min: 1.20,
    operator_type: "MALL",
  },
  {
    id: "east_coast_mall",
    name: "East Coast Mall Carpark",
    latitude: 1.3052,
    longitude: 103.9084,
    rate_per_30min: 1.20,
    operator_type: "MALL",
  },
  {
    id: "marine_parade_central",
    name: "Marine Parade Central Carpark",
    latitude: 1.3018,
    longitude: 103.8987,
    rate_per_30min: 1.20,
    operator_type: "COMMERCIAL",
  },
  {
    id: "parkway_parade",
    name: "Parkway Parade Carpark",
    latitude: 1.3051,
    longitude: 103.9036,
    rate_per_30min: 1.20,
    operator_type: "MALL",
  },
];

