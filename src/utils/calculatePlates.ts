export interface PlateCount {
  weight: number;
  count: number;
}

export interface PlateCalculation {
  platesPerSide: PlateCount[];
  totalWeight: number;
  targetWeight: number;
  difference: number;
}

const BARBELL_WEIGHT = 45;
const AVAILABLE_PLATES = [45, 35, 25, 10, 5, 2.5];
export const MAX_WEIGHT = 1500;

/**
 * Calculates the optimal plate configuration for a target weight
 * Uses a greedy algorithm to maximize use of larger plates first
 */
export function calculatePlates(targetWeight: number): PlateCalculation {
  // Validate input
  if (targetWeight < BARBELL_WEIGHT) {
    return {
      platesPerSide: [],
      totalWeight: BARBELL_WEIGHT,
      targetWeight,
      difference: BARBELL_WEIGHT - targetWeight,
    };
  }

  // Calculate weight needed per side
  const weightPerSide = (targetWeight - BARBELL_WEIGHT) / 2;
  
  // Use greedy algorithm to select plates
  let remainingWeight = weightPerSide;
  const platesPerSide: PlateCount[] = [];

  for (const plateWeight of AVAILABLE_PLATES) {
    const count = Math.floor(remainingWeight / plateWeight);
    if (count > 0) {
      platesPerSide.push({ weight: plateWeight, count });
      remainingWeight -= count * plateWeight;
    }
  }

  // Calculate actual total weight achieved
  const weightFromPlates = platesPerSide.reduce(
    (sum, plate) => sum + plate.weight * plate.count * 2, // multiply by 2 for both sides
    0
  );
  const totalWeight = BARBELL_WEIGHT + weightFromPlates;
  const difference = targetWeight - totalWeight;

  return {
    platesPerSide,
    totalWeight,
    targetWeight,
    difference,
  };
}

/**
 * Gets the color class for a given plate weight
 */
export function getPlateColor(weight: number): string {
  switch (weight) {
    case 45:
      return 'bg-red-500';
    case 35:
      return 'bg-blue-500';
    case 25:
      return 'bg-yellow-400';
    case 10:
      return 'bg-green-500';
    case 5:
    case 2.5:
      return 'bg-gray-700';
    default:
      return 'bg-gray-500';
  }
}

/**
 * Gets the relative size (diameter) for visual representation
 */
export function getPlateSize(weight: number): number {
  switch (weight) {
    case 45:
      return 100; // largest
    case 35:
      return 85;
    case 25:
      return 75;
    case 10:
      return 60;
    case 5:
      return 50;
    case 2.5:
      return 40; // smallest
    default:
      return 50;
  }
}

/**
 * Calculates total weight from a given plate configuration
 * Used when manually adjusting plates
 */
export function calculateWeightFromPlates(platesPerSide: PlateCount[]): number {
  const weightFromPlates = platesPerSide.reduce(
    (sum, plate) => sum + plate.weight * plate.count * 2, // multiply by 2 for both sides
    0
  );
  return BARBELL_WEIGHT + weightFromPlates;
}

