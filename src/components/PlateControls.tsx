import type { PlateCount } from '../utils/calculatePlates';
import { getPlateColor, calculateWeightFromPlates, MAX_WEIGHT } from '../utils/calculatePlates';

interface PlateControlsProps {
  plates: PlateCount[];
  onPlateChange: (plates: PlateCount[]) => void;
}

const PLATE_TYPES = [45, 35, 25, 10, 5, 2.5];
const MAX_PLATES_PER_TYPE = 10;

export function PlateControls({ plates, onPlateChange }: PlateControlsProps) {
  // Get count for a specific plate weight
  const getCount = (weight: number): number => {
    const plate = plates.find((p) => p.weight === weight);
    return plate ? plate.count : 0;
  };

  // Update count for a specific plate weight
  const updateCount = (weight: number, delta: number) => {
    const currentCount = getCount(weight);
    const newCount = Math.max(0, Math.min(MAX_PLATES_PER_TYPE, currentCount + delta));

    if (newCount === currentCount) return; // No change

    // Create updated plates array
    const updatedPlates = PLATE_TYPES.map((plateWeight) => {
      if (plateWeight === weight) {
        return { weight: plateWeight, count: newCount };
      }
      return { weight: plateWeight, count: getCount(plateWeight) };
    }).filter((plate) => plate.count > 0); // Only keep plates with count > 0

    // Check if new configuration would exceed max weight
    const newTotalWeight = calculateWeightFromPlates(updatedPlates);
    if (newTotalWeight > MAX_WEIGHT) {
      return; // Don't allow change if it would exceed limit
    }

    onPlateChange(updatedPlates);
  };

  // Get color name for display
  const getColorName = (weight: number): string => {
    switch (weight) {
      case 45: return 'Red';
      case 35: return 'Blue';
      case 25: return 'Yellow';
      case 10: return 'Green';
      case 5:
      case 2.5: return 'Gray';
      default: return '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Manual Plate Adjustment (per side)
        </h3>
        
        <div className="space-y-3">
          {PLATE_TYPES.map((weight) => {
            const count = getCount(weight);
            const colorClass = getPlateColor(weight);
            const colorName = getColorName(weight);
            
            // Check if adding one more plate would exceed max weight
            const testPlates = PLATE_TYPES.map((plateWeight) => ({
              weight: plateWeight,
              count: plateWeight === weight ? count + 1 : getCount(plateWeight),
            })).filter((plate) => plate.count > 0);
            const wouldExceedLimit = calculateWeightFromPlates(testPlates) > MAX_WEIGHT;
            
            return (
              <div
                key={weight}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                {/* Plate info */}
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-6 h-6 ${colorClass} rounded`} />
                  <span className="font-medium text-gray-900 w-16">
                    {weight} lb
                  </span>
                  <span className="text-sm text-gray-500">{colorName}</span>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateCount(weight, -1)}
                    disabled={count === 0}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label={`Decrease ${weight} lb plates`}
                  >
                    <span className="text-lg font-semibold">−</span>
                  </button>
                  
                  <span className="w-8 text-center font-semibold text-gray-900">
                    {count}
                  </span>
                  
                  <button
                    onClick={() => updateCount(weight, 1)}
                    disabled={count >= MAX_PLATES_PER_TYPE || wouldExceedLimit}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label={`Increase ${weight} lb plates`}
                  >
                    <span className="text-lg font-semibold">+</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
          Click + or − to manually adjust plates. Enter a new target weight to recalculate.
        </div>
      </div>
    </div>
  );
}

