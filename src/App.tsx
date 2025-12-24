import { useState, useMemo, useEffect } from 'react';
import { WeightInput } from './components/WeightInput';
import { BarbellVisualizer } from './components/BarbellVisualizer';
import { PlateControls } from './components/PlateControls';
import { calculatePlates, calculateWeightFromPlates, MAX_WEIGHT } from './utils/calculatePlates';
import type { PlateCount } from './utils/calculatePlates';

function App() {
  const [targetWeight, setTargetWeight] = useState<string>('');
  const [manualPlates, setManualPlates] = useState<PlateCount[]>([]);

  // Calculate plates when target weight changes
  const calculatedPlates = useMemo(() => {
    const weight = parseFloat(targetWeight);
    if (isNaN(weight) || weight <= 0) {
      return [];
    }
    return calculatePlates(weight).platesPerSide;
  }, [targetWeight]);

  // When target weight changes, override manual plates with calculation
  useEffect(() => {
    if (targetWeight) {
      setManualPlates(calculatedPlates);
    }
  }, [targetWeight, calculatedPlates]);

  // Handle target weight input changes
  const handleWeightChange = (weight: string) => {
    setTargetWeight(weight);
    // calculatedPlates will update via useMemo, then useEffect will update manualPlates
  };

  // Handle manual plate adjustments
  const handlePlateChange = (newPlates: PlateCount[]) => {
    setManualPlates(newPlates);
  };

  // Reset everything
  const handleReset = () => {
    setTargetWeight('');
    setManualPlates([]);
  };

  // Calculate actual weight and difference
  const actualWeight = manualPlates.length > 0 ? calculateWeightFromPlates(manualPlates) : 45;
  const targetWeightNum = parseFloat(targetWeight) || 0;
  const difference = targetWeightNum - actualWeight;

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
            onWeightChange={handleWeightChange}
            actualWeight={actualWeight}
            difference={difference}
            maxWeight={MAX_WEIGHT}
            hasPlates={manualPlates.length > 0}
          />
        </div>

        {/* Barbell Visualization */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <BarbellVisualizer platesPerSide={manualPlates} />
          
          {/* Reset Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium shadow-sm"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Manual Plate Controls */}
        <PlateControls 
          plates={manualPlates} 
          onPlateChange={handlePlateChange}
        />

        {/* Info footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Made with love in Brooklyn, NY. 💪🏾❤️</p>
        </div>
      </div>
    </div>
  );
}

export default App;
