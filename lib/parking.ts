export const HDB_RATE_PER_30MIN = 0.60;

export function estimate1HourCost(ratePer30Min: number) {
  return ratePer30Min * 2;
}

export function sortCarparks(carparks: any[]) {
  return carparks.sort((a, b) => {
    if (a.distance_m !== b.distance_m) {
      return a.distance_m - b.distance_m;
    }
    return a.estimated_1h_cost - b.estimated_1h_cost;
  });
}

export function addSavings(carparks: any[]) {
  if (carparks.length === 0) return carparks;

  // Find highest 1-hour cost
  const maxCost = Math.max(
    ...carparks.map((cp) => cp.estimated_1h_cost)
  );

  return carparks.map((cp) => ({
    ...cp,
    savings_vs_max: +(maxCost - cp.estimated_1h_cost).toFixed(2),
  }));
}