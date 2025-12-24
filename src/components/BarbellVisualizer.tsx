import { Plate } from './Plate';
import type { PlateCount } from '../utils/calculatePlates';

interface BarbellVisualizerProps {
  platesPerSide: PlateCount[];
}

export function BarbellVisualizer({ platesPerSide }: BarbellVisualizerProps) {
  // Flatten plate counts into individual plates for rendering
  const flattenPlates = (plates: PlateCount[]) => {
    const flattened: number[] = [];
    plates.forEach((plate) => {
      for (let i = 0; i < plate.count; i++) {
        flattened.push(plate.weight);
      }
    });
    return flattened;
  };

  // Reverse so heaviest plates are closest to center
  const leftPlates = flattenPlates(platesPerSide).reverse();
  const rightPlates = flattenPlates(platesPerSide); // Same order for right side

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      {/* Plate breakdown text */}
      {platesPerSide.length > 0 && (
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 font-medium">
            Per Side:{' '}
            {platesPerSide.map((plate, idx) => (
              <span key={idx} className="mx-1">
                {plate.count}×{plate.weight}lb
                {idx < platesPerSide.length - 1 ? ',' : ''}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Barbell visualization */}
      <div className="flex items-center justify-center gap-1 px-4">
        {/* Left sleeve end */}
        <div className="w-4 h-8 bg-gray-500 rounded-lg shadow-sm" />

        {/* Left plates */}
        <div className="flex items-center gap-1">
          {leftPlates.map((weight, idx) => (
            <Plate key={`left-${idx}`} weight={weight} />
          ))}
        </div>

        {/* Barbell bar */}
        <div className="h-8 bg-gray-500 rounded-lg flex-grow min-w-[200px] max-w-[400px] relative shadow-sm">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-white bg-gray-600 px-3 py-1 rounded-md">
              45 lb
            </span>
          </div>
        </div>

        {/* Right plates */}
        <div className="flex items-center gap-1">
          {rightPlates.map((weight, idx) => (
            <Plate key={`right-${idx}`} weight={weight} />
          ))}
        </div>

        {/* Right sleeve end */}
        <div className="w-4 h-8 bg-gray-500 rounded-lg shadow-sm" />
      </div>

      {/* Empty state message */}
      {platesPerSide.length === 0 && (
        <div className="text-center mt-4 text-gray-500 text-sm">
          Enter a weight above 45 lbs to load plates
        </div>
      )}
    </div>
  );
}

