import { useState, useMemo } from 'react';
import { WeightInput } from './components/WeightInput';
import { BarbellVisualizer } from './components/BarbellVisualizer';
import { calculatePlates } from './utils/calculatePlates';

function App() {
  const [targetWeight, setTargetWeight] = useState<string>('');

  // Calculate plates based on input
  const calculation = useMemo(() => {
    const weight = parseFloat(targetWeight);
    if (isNaN(weight) || weight <= 0) {
      return {
        platesPerSide: [],
        totalWeight: 45,
        targetWeight: 0,
        difference: 0,
      };
    }
    return calculatePlates(weight);
  }, [targetWeight]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Barbell Weight Visualizer
          </h1>
          <p className="text-gray-600">
            Enter a target weight to see the optimal plate configuration
          </p>
        </div>

        {/* Weight Input Section */}
        <div className="mb-12">
          <WeightInput
            targetWeight={targetWeight}
            onWeightChange={setTargetWeight}
            actualWeight={calculation.totalWeight}
            difference={calculation.difference}
          />
        </div>

        {/* Barbell Visualization */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <BarbellVisualizer platesPerSide={calculation.platesPerSide} />
        </div>

        {/* Info footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Standard barbell weight: 45 lbs</p>
          <p className="mt-1">
            Available plates: 45, 35, 25, 10, 5, and 2.5 lbs
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
