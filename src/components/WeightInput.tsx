interface WeightInputProps {
  targetWeight: string;
  onWeightChange: (weight: string) => void;
  actualWeight: number;
  difference: number;
}

export function WeightInput({
  targetWeight,
  onWeightChange,
  actualWeight,
  difference,
}: WeightInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string or valid numbers
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      onWeightChange(value);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div>
        <label
          htmlFor="weight-input"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Target Weight (lbs)
        </label>
        <input
          id="weight-input"
          type="text"
          value={targetWeight}
          onChange={handleChange}
          placeholder="Enter weight (e.g., 225)"
          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {targetWeight && (
        <div className="bg-white rounded-lg p-4 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Actual Weight:</span>
            <span className="text-xl font-semibold text-gray-900">
              {actualWeight} lbs
            </span>
          </div>
          {difference !== 0 && (
            <div className="text-sm text-gray-500 pt-2 border-t">
              {difference > 0 ? (
                <span className="text-amber-600">
                  {difference.toFixed(1)} lbs under target
                </span>
              ) : (
                <span className="text-green-600">Exact match!</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

